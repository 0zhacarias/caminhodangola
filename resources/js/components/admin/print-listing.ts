import type { Column } from '@/components/admin/data-table';
import { nodeToText } from '@/components/admin/describe-item';

interface PrintListingProps<T> {
    title: string;
    columns: Column<T>[];
    data: T[];
    searchTerm?: string;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function printListing<T>({
    title,
    columns,
    data,
    searchTerm,
}: PrintListingProps<T>) {
    const printWindow = window.open('', '_blank', 'width=1024,height=768');

    if (printWindow === null) {
        return;
    }

    const generatedAt = new Date().toLocaleString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const header = columns
        .map((column) => `<th>${escapeHtml(column.label)}</th>`)
        .join('');

    const rows = data
        .map((item) => {
            const cells = columns
                .map((column) => {
                    const rendered = column.render
                        ? nodeToText(column.render(item))
                        : nodeToText(
                              (item as Record<string, unknown>)[column.key],
                          );

                    return `<td>${escapeHtml(rendered)}</td>`;
                })
                .join('');

            return `<tr>${cells}</tr>`;
        })
        .join('');

    const orientation = columns.length > 6 ? 'landscape' : 'portrait';

    const metaParts = [
        `Gerado em ${escapeHtml(generatedAt)}`,
        `${data.length} registo(s)`,
    ];

    if (searchTerm !== undefined && searchTerm.trim() !== '') {
        metaParts.push(`Filtro: “${escapeHtml(searchTerm.trim())}”`);
    }

    printWindow.document.open();
    printWindow.document.write(`<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #0f172a; margin: 32px; }
    header { border-bottom: 2px solid #0f172a; margin-bottom: 20px; padding-bottom: 12px; }
    h1 { font-size: 22px; margin: 0 0 6px; }
    .meta { font-size: 12px; color: #475569; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; vertical-align: top; }
    th { background-color: #f1f5f9; }
    tr { page-break-inside: avoid; }
    thead { display: table-header-group; }
    @media print {
        body { margin: 12mm; }
        @page { size: A4 ${orientation}; }
    }
</style>
</head>
<body>
<header>
    <h1>${escapeHtml(title)}</h1>
    <p class="meta">${metaParts.join(' • ')}</p>
</header>
<table>
    <thead><tr>${header}</tr></thead>
    <tbody>${rows}</tbody>
</table>
<script>
    window.addEventListener('load', () => {
        window.focus();
        window.print();
    });
</script>
</body>
</html>`);
    printWindow.document.close();
}
