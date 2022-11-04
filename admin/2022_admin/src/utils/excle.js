import XLSX from 'xlsx'

function getHeaderRow(sheet) {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell =
      sheet[
        XLSX.utils.encode_cell({ c: C, r: R })
      ] /* find the cell in the first row */
    let hdr = `UNKNOWN${C}` // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const read = (data, type) => {
  const workbook = XLSX.read(data, { type })
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  const header = getHeaderRow(worksheet)
  const results = XLSX.utils.sheet_to_json(worksheet)

  return { header, results }
}
