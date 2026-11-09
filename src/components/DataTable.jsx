import { useState } from 'react';
import {
    Search, Download, Filter, ChevronLeft, ChevronRight,
    ChevronDown, ChevronUp, MoreVertical
} from 'lucide-react';

function StatusBadge({ status }) {
    let colorClass = 'text-gray-600';
    if (status === 'Draft') colorClass = 'text-red-500 font-medium';
    if (status === 'Live') colorClass = 'text-green-500 font-medium';
    if (status === 'Active') colorClass = 'text-gray-800';

    return <span className={colorClass}>{status}</span>;
}

export default function DataTable({ title, headerColor, data, columns, paginationText, onRowClick }) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="bg-white rounded shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div
                className={`${headerColor} px-4 py-2 flex justify-between items-center cursor-pointer`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h2 className="text-white font-semibold text-sm">{title}</h2>
                {isExpanded ? <ChevronUp className="text-white w-4 h-4" /> : <ChevronDown className="text-white w-4 h-4" />}
            </div>

            {isExpanded && (
                <div className="flex flex-col">
                    <div className="flex justify-between items-center p-3 border-b border-gray-200">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-8 pr-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex space-x-3 text-sm text-blue-600 font-medium">
                            <button className="flex items-center hover:text-blue-800">
                                <Download className="w-4 h-4 mr-1" /> EXPORT
                            </button>
                            <button className="flex items-center hover:text-blue-800">
                                <Filter className="w-4 h-4 mr-1" /> FILTERS
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {columns.map((col, idx) => (
                                        <th key={idx} className="p-3 font-semibold text-gray-600 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {col.label}
                                                {col.sortable && <ChevronUp className="w-3 h-3 ml-1 text-gray-400" />}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                                        onKeyDown={onRowClick ? (event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                onRowClick(row);
                                            }
                                        } : undefined}
                                        tabIndex={onRowClick ? 0 : undefined}
                                        aria-label={onRowClick ? `Open integration grid for ${row.firstName} ${row.lastName}` : undefined}
                                    >
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className={`p-3 ${colIndex === 0 ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                                                {col.key === 'configStatus' || col.key === 'activeStatus'
                                                    ? <StatusBadge status={row[col.key]} />
                                                    : row[col.key]}
                                            </td>
                                        ))}
                                        <td className="p-3 text-right">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-600">
                        <div className="flex items-center">
                            <span className="mr-2">Rows per page:</span>
                            <select className="border border-gray-300 rounded p-1 bg-white focus:outline-none">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                            <span className="ml-4">{paginationText}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="p-1 rounded hover:bg-gray-200 disabled:opacity-50" disabled><ChevronLeft className="w-4 h-4" /></button>
                            <button className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">1</button>
                            <button className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center">2</button>
                            <button className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center">3</button>
                            <span className="px-1">...</span>
                            <button className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center">15</button>
                            <button className="p-1 rounded hover:bg-gray-200"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
