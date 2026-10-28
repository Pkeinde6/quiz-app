// Decoupe le contenu d'une section de cours en blocs "texte" et "code",
// et colore le code (mots-cles GraphQL, operations, types, chaines, commentaires).
// Utilise par CoursePage.vue et par le generateur de videos.

const CODE_LINE = [
  /[{}]/,                                              // accolades GraphQL / JSON
  /[│├└┌┐┘═─▶◀▼]/,                                       // schemas en caracteres
  /^\s*(query|mutation|fragment|input|type|enum|POST|GET|PUT|PATCH|DELETE|Authorization|curl|-H)\b/,
  /^\s*(x-[a-z-]+|content-type)\s*:/i,                 // en-tete HTTP
  /^\s*https?:\/\//,                                   // URL
  /^\s*[\/A-Za-z]*\/[\w{}\-]+\/[\w{}\/\-?=&.\[\]]*/,  // chemin d'API seul
  /^\s*[a-z][A-Za-z0-9_.]*\s*\(/,                      // operation(…)
  /^\s*[a-z]+[A-Z][A-Za-z0-9]*\b/,                     // camelCase en debut de ligne
  /^\s*"[^"]+"\s*:/,                                   // cle JSON
  /^\s*\$\w+/,                                         // variable
  /^\s*[a-z]\w*\s*:\s*\[?[A-Z]\w*/,                    // champ: Type
  /^\s*[A-ZÉÈÀ][A-ZÉÈÀ0-9_]{2,}(\s{2,}|\s*$|\s*[=│▶◀─→(])/,   // VALEUR_ENUM / titre de liste
];

export function isCodeLine(line) {
  return CODE_LINE.some(re => re.test(line));
}

// Regroupe les lignes consecutives du meme type. Une ligne vide entre deux
// lignes de code reste dans le bloc de code.
export function toBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  lines.forEach((line, i) => {
    let type;
    if (line.trim() === '') {
      const next = lines.slice(i + 1).find(l => l.trim() !== '');
      const prev = blocks[blocks.length - 1];
      type = prev && prev.type === 'code' && next && isCodeLine(next) ? 'code' : 'text';
    } else {
      type = isCodeLine(line) ? 'code' : 'text';
    }
    const last = blocks[blocks.length - 1];
    if (last && last.type === type) last.lines.push(line);
    else blocks.push({ type, lines: [line] });
  });
  return blocks
    .map(b => ({ type: b.type, text: dedent(trimEmpty(b.lines)).join('\n') }))
    .filter(b => b.text.trim() !== '');
}

function trimEmpty(lines) {
  let a = 0, z = lines.length;
  while (a < z && !lines[a].trim()) a++;
  while (z > a && !lines[z - 1].trim()) z--;
  return lines.slice(a, z);
}

function dedent(lines) {
  const ind = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
  return lines.map(l => l.slice(ind));
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function highlight(code) {
  return code.split('\n').map(line => {
    // commentaires "# …" ou texte d'explication apres 2+ espaces
    let comment = '';
    const m = line.match(/^(.*?\S)(\s{2,}(?:#.*|[a-zàâéèêëîïôûùç(→←✔⚠].*))$/) || line.match(/^(\s*)(#.*)$/);
    if (m) { line = m[1]; comment = m[2]; }
    let h = esc(line)
      .replace(/(&quot;|")([^"]*)(")/g, '<span class="tok-str">"$2"</span>')
      .replace(/\b(query|mutation|fragment|input|type|enum|on|true|false|null|GET|POST|PUT|PATCH|DELETE)\b/g, '<span class="tok-kw">$1</span>')
      .replace(/\b([a-z][A-Za-z0-9_]*)(?=\s*\()/g, '<span class="tok-fn">$1</span>')
      .replace(/(:\s*\[?)([A-Z][A-Za-z0-9]*)(!?\]?!?)/g, '$1<span class="tok-type">$2</span>$3')
      .replace(/(\$\w+)/g, '<span class="tok-var">$1</span>');
    if (comment) h += '<span class="tok-cmt">' + esc(comment) + '</span>';
    return h;
  }).join('\n');
}

// Coloration JavaScript (page GSAP) : commentaires, chaines, mots-cles, nombres, appels, proprietes.
export function highlightJs(code) {
  const KW = /^(const|let|var|function|return|if|else|for|while|new|this|true|false|null|undefined|import|from|export|default|async|await|of|in|=>)$/;
  const re = /(\/\/.*$|\/\*[\s\S]*?\*\/)|(`(?:\.|[^`])*`|'(?:\.|[^'])*'|"(?:\.|[^"])*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)(?=\s*:)|([A-Za-z_$][\w$]*|=>)/gm;
  let out = '', last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const [tok, cmt, str, num, fn, prop, word] = m;
    if (cmt) out += `<span class="tok-cmt">${esc(cmt)}</span>`;
    else if (str) out += `<span class="tok-str">${esc(str)}</span>`;
    else if (num) out += `<span class="tok-num">${num}</span>`;
    else if (fn) out += KW.test(fn) ? `<span class="tok-kw">${fn}</span>` : `<span class="tok-fn">${fn}</span>`;
    else if (prop) out += `<span class="tok-type">${prop}</span>`;
    else out += KW.test(word) ? `<span class="tok-kw">${esc(word)}</span>` : (word === 'gsap' ? `<span class="tok-var">gsap</span>` : esc(word));
    last = m.index + tok.length;
  }
  return out + esc(code.slice(last));
}
