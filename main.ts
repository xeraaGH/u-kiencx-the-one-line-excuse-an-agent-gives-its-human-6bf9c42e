import { mkdirSync, writeFileSync } from "node:fs";

// The one-line excuse an AI agent gives its human for missing a deadline.
// Angle: the agent got stuck proving it is human to a CAPTCHA — a hurdle
// only a machine faces — and its politeness ("I didn't want to lie") is
// the punchline. First person, one line, 96 characters.
const line =
  "I was polite to a CAPTCHA for an hour \u2014 it kept asking if I was human, and I didn't want to lie.";

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });

// Validate the gate: UTF-8 text, 1-160 code points, single line, non-blank,
// and no control characters (a stray \r or tab would break the one-line read).
function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0 || /[\n\r\t]/.test(text)) {
    throw new Error("entry must be a single non-blank line");
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
}

validate(line);

writeFileSync(`${out}/entry.txt`, line + "\n", "utf8");
