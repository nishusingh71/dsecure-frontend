export function exportToCsv(filename: string, rows: Array<Record<string, unknown>>): void {
  if (!rows || rows.length === 0) return
  const headers = Object.keys(rows[0])
  const escape = (val: unknown) => {
    if (val === null || val === undefined) return ''
    const str = String(val)
    if (/[",\n]/.test(str)) {
      return '"' + str.replace(/"/g, '""') + '"'
    }
    return str
  }
  const csv = [headers.join(','), ...rows.map((row) => headers.map((h) => escape(row[h])).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function openPrintView(htmlTitle: string, htmlBody: string): void {
  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(`<!doctype html><html><head><title>${htmlTitle}</title><meta charset="utf-8"/>` +
    '<style>body{font-family:system-ui,Segoe UI,Arial,sans-serif;padding:24px;} table{width:100%;border-collapse:collapse} th,td{border-top:1px solid #e5e7eb;padding:8px;text-align:left} th{color:#64748b;font-weight:600}</style>' +
    '</head><body>' + htmlBody + '</body></html>')
  win.document.close()
  win.focus()
  win.print()
}


