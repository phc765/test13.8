import React, { useMemo } from 'react';
import { StudentResult, RiskLevel } from '../types';

interface AdminDashboardProps {
    studentData: StudentResult[];
}

const getRiskLevelInfo = (level: RiskLevel) => {
    switch (level) {
        case RiskLevel.SAFE:
            return { text: 'An toàn', color: 'text-green-600', bgColor: 'bg-green-100' };
        case RiskLevel.MEDIUM_RISK:
            return { text: 'Rủi ro trung bình', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        case RiskLevel.HIGH_RISK:
            return { text: 'Rủi ro cao', color: 'text-red-600', bgColor: 'bg-red-100' };
        default:
            return { text: 'Không xác định', color: 'text-slate-500', bgColor: 'bg-slate-100' };
    }
};

const exportToExcel = (data: StudentResult[]) => {
    const headers = ['Họ và tên', 'Lớp', 'Trường', 'Tỉnh/Thành', 'Điểm', 'Mức độ Rủi ro', 'Thời gian'];
    
    const rows = data.map(student => {
        const riskInfo = getRiskLevelInfo(student.riskLevel);
        const formattedTimestamp = new Date(student.timestamp).toLocaleString('vi-VN');
        const sanitize = (field: string | number) => `"${String(field).replace(/"/g, '""')}"`;

        return [
            sanitize(student.name),
            sanitize(student.class),
            sanitize(student.school),
            sanitize(student.province),
            student.score,
            sanitize(riskInfo.text),
            sanitize(formattedTimestamp)
        ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `danh-sach-hoc-sinh-${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};


const AnalyticsCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-slate-100 p-3 rounded-full">{icon}</div>
        <div>
            <h3 className="text-slate-500 text-sm font-medium uppercase">{title}</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
    </div>
);

const RiskChart: React.FC<{ data: StudentResult[] }> = ({ data }) => {
    const counts = useMemo(() => ({
        high: data.filter(s => s.riskLevel === RiskLevel.HIGH_RISK).length,
        medium: data.filter(s => s.riskLevel === RiskLevel.MEDIUM_RISK).length,
        safe: data.filter(s => s.riskLevel === RiskLevel.SAFE).length,
    }), [data]);

    const maxCount = Math.max(counts.high, counts.medium, counts.safe);
    const yAxisTop = maxCount === 0 ? 10 : Math.ceil(maxCount / 5) * 5;

    const bars = [
        { label: 'Rủi ro cao', count: counts.high, color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
        { label: 'Rủi ro TB', count: counts.medium, color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
        { label: 'An toàn', count: counts.safe, color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    ];

    if (data.length === 0) {
        return <div className="text-center text-slate-500 py-10">Chưa có dữ liệu để hiển thị biểu đồ.</div>;
    }

    return (
        <div>
            <h3 className="font-bold text-lg text-slate-800 mb-4">Biểu đồ Số lượng Học sinh theo Mức độ Rủi ro</h3>
            <div className="flex" style={{ height: '250px' }}>
                <div className="flex flex-col justify-between text-right text-xs text-slate-500 pr-2 w-8 py-2">
                    <span>{yAxisTop}</span>
                    <span>{yAxisTop * 3 / 4}</span>
                    <span>{yAxisTop / 2}</span>
                    <span>{yAxisTop / 4}</span>
                    <span>0</span>
                </div>
                <div className="w-full flex justify-around items-end border-l border-b border-slate-200 pl-4">
                    {bars.map(bar => (
                        <div key={bar.label} className="flex flex-col items-center w-1/4 h-full justify-end">
                            <span className="text-sm font-bold text-slate-700">{bar.count}</span>
                            <div 
                                className={`w-12 md:w-16 rounded-t-md transition-all duration-300 ${bar.color} ${bar.hoverColor}`}
                                style={{ height: yAxisTop > 0 ? `${(bar.count / yAxisTop) * 95}%` : '0%' }}
                                title={`${bar.label}: ${bar.count} học sinh`}
                            ></div>
                            <span className="text-xs text-center mt-2 text-slate-600 font-medium h-8">{bar.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export const AdminDashboard: React.FC<AdminDashboardProps> = ({ studentData }) => {
    const sortedData = useMemo(() => 
        [...studentData].sort((a, b) => b.timestamp - a.timestamp),
        [studentData]
    );

    const counts = useMemo(() => ({
        high: studentData.filter(s => s.riskLevel === RiskLevel.HIGH_RISK).length,
        medium: studentData.filter(s => s.riskLevel === RiskLevel.MEDIUM_RISK).length,
        safe: studentData.filter(s => s.riskLevel === RiskLevel.SAFE).length,
    }), [studentData]);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Bảng điều khiển Quản trị viên</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnalyticsCard title="Tổng số tham gia" value={studentData.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a3.001 3.001 0 014.644 0M6.356 18.143C8.068 17.157 10 17 12 17s3.932.157 5.644 1.143m-9.288 0M14 10a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} />
                <AnalyticsCard title="Học sinh Rủi ro cao" value={counts.high} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
                <AnalyticsCard title="Học sinh An toàn" value={counts.safe} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
               <RiskChart data={studentData} />
            </div>

            <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2 sm:mb-0">Danh sách Học sinh đã tham gia</h2>
                    <button 
                        onClick={() => exportToExcel(sortedData)}
                        disabled={sortedData.length === 0}
                        className="flex items-center justify-center px-4 py-2 font-semibold text-sm text-green-700 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zM10 13a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2H5a1 1 0 110-2V4zm3 1a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M4 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" /><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H5zm3 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v2h16V5a1 1 0 00-1-1H5zm15 4H4v10a1 1 0 001 1h14a1 1 0 001-1V8z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /><path d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586l3.293-3.293a1 1 0 011.414 0z" /><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 13a1 1 0 112 0v2a1 1 0 11-2 0v-2zm2-6a1 1 0 00-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>
                        Xuất file Excel (.csv)
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    {sortedData.length > 0 ? (
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-600">Họ và tên</th>
                                    <th className="p-4 font-semibold text-slate-600">Lớp</th>
                                    <th className="p-4 font-semibold text-slate-600">Trường</th>
                                    <th className="p-4 font-semibold text-slate-600">Tỉnh/Thành</th>
                                    <th className="p-4 font-semibold text-slate-600">Điểm</th>
                                    <th className="p-4 font-semibold text-slate-600">Mức độ Rủi ro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map(student => {
                                    const riskInfo = getRiskLevelInfo(student.riskLevel);
                                    return (
                                        <tr key={student.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-medium text-slate-800">{student.name}</td>
                                            <td className="p-4 text-slate-600">{student.class}</td>
                                            <td className="p-4 text-slate-600">{student.school}</td>
                                            <td className="p-4 text-slate-600">{student.province}</td>
                                            <td className="p-4 text-slate-600 font-bold">{student.score}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${riskInfo.bgColor} ${riskInfo.color}`}>
                                                    {riskInfo.text}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center p-8 text-slate-500">Chưa có học sinh nào hoàn thành bài khảo sát.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
