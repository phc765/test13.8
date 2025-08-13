import React, { useState } from 'react';
import type { User } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const StudentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [view, setView] = useState<'student' | 'admin'>('student');

    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [studentProvince, setStudentProvince] = useState('');
    
    const [adminUser, setAdminUser] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [adminError, setAdminError] = useState('');

    const handleStudentLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (studentName && studentClass && studentSchool && studentProvince) {
            onLogin({
                role: 'student',
                name: studentName,
                class: studentClass,
                school: studentSchool,
                province: studentProvince,
            });
        }
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (adminUser === 'admin' && adminPass === 'admin') {
            onLogin({ role: 'admin', name: 'Admin' });
            setAdminError('');
        } else {
            setAdminError('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    };

    const isStudentFormValid = studentName && studentClass && studentSchool && studentProvince;

    return (
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg max-w-lg mx-auto">
            <div className="flex border-b border-slate-200 mb-6">
                <button 
                    onClick={() => setView('student')} 
                    className={`flex-1 py-3 font-semibold text-center flex items-center justify-center transition-colors ${view === 'student' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    <StudentIcon/> Học sinh
                </button>
                <button 
                    onClick={() => setView('admin')} 
                    className={`flex-1 py-3 font-semibold text-center flex items-center justify-center transition-colors ${view === 'admin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    <AdminIcon/> Quản trị viên
                </button>
            </div>
            
            {view === 'student' && (
                <form onSubmit={handleStudentLogin} className="space-y-4 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Thông tin Học sinh</h2>
                    <p className="text-center text-slate-500 mb-6">Vui lòng nhập thông tin để bắt đầu bài khảo sát. Thông tin này dùng cho mục đích thống kê.</p>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Họ và tên</label>
                        <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Nguyễn Văn A" required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Lớp</label>
                        <input type="text" value={studentClass} onChange={e => setStudentClass(e.target.value)} placeholder="12A1" required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Trường</label>
                        <input type="text" value={studentSchool} onChange={e => setStudentSchool(e.target.value)} placeholder="THPT Chuyên..." required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Tỉnh/Thành phố</label>
                        <input type="text" value={studentProvince} onChange={e => setStudentProvince(e.target.value)} placeholder="Hà Nội" required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" disabled={!isStudentFormValid} className="w-full mt-4 py-3 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed">
                        Bắt đầu Khảo sát
                    </button>
                </form>
            )}

            {view === 'admin' && (
                <form onSubmit={handleAdminLogin} className="space-y-4 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Đăng nhập Admin</h2>
                     <div>
                        <label className="block text-slate-700 font-medium mb-1">Tên đăng nhập</label>
                        <input type="text" value={adminUser} onChange={e => setAdminUser(e.target.value)} required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Mật khẩu</label>
                        <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {adminError && <p className="text-red-500 text-sm text-center">{adminError}</p>}
                    <button type="submit" className="w-full mt-4 py-3 font-bold text-white bg-rose-600 rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors">
                        Đăng nhập
                    </button>
                </form>
            )}
        </div>
    );
};
