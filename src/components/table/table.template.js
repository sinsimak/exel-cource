// 'A'.charCodeAt() вернёт xbckj 65
// String.fromCharCode(65) вернёт 'A'
// eslint-disable-next-line no-unused-vars
const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `;
}

function toColumn(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `;
}

function createRow(content, rowNumber) {
  const number = rowNumber || '';
  return `
    <div>
        <div class="row">
            <div class="row-info">${number}</div>
            <div class="row-data">${content}</div>
        </div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1; // +1 чтобы увидеть код буквы Z
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  const cels = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cels, i + 1));
  }

  return rows.join('');
}
