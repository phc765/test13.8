import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { QuizForm } from './components/QuizForm';
import { ResultDisplay } from './components/ResultDisplay';
import { HelpButton } from './components/HelpButton';
import { HelpModal } from './components/HelpModal';
import { QUIZ_QUESTIONS } from './constants';
import { RiskLevel, User, StudentResult } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  // Load results from localStorage on mount
  useEffect(() => {
    try {
      const savedResults = localStorage.getItem('studentResults');
      if (savedResults) {
        setStudentResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error("Failed to load student results from localStorage", error);
      setStudentResults([]);
    }
  }, []);

  // Persist results to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('studentResults', JSON.stringify(studentResults));
    } catch (error) {
      console.error("Failed to save student results to localStorage", error);
    }
  }, [studentResults]);
  
  // This state is for the student currently taking the quiz
  const [currentQuizRiskLevel, setCurrentQuizRiskLevel] = useState<RiskLevel>(RiskLevel.NONE);
  const [showResult, setShowResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    // Reset quiz state for new student login
    setShowResult(false);
    setCurrentQuizRiskLevel(RiskLevel.NONE);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const handleQuizSubmit = useCallback((scores: Record<string, number>) => {
    if (!user || user.role !== 'student') return;

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    let level: RiskLevel;
    if (totalScore <= 5) {
      level = RiskLevel.SAFE;
    } else if (totalScore <= 15) {
      level = RiskLevel.MEDIUM_RISK;
    } else {
      level = RiskLevel.HIGH_RISK;
    }
    setCurrentQuizRiskLevel(level);

    const newResult: StudentResult = {
      id: `${Date.now()}-${user.name}`, // simple unique id
      name: user.name,
      class: user.class || '',
      school: user.school || '',
      province: user.province || '',
      score: totalScore,
      riskLevel: level,
      timestamp: Date.now(),
    };

    setStudentResults(prevResults => [...prevResults, newResult]);
    
    setShowResult(true);
    setTimeout(() => {
        const resultEl = document.getElementById('result-section');
        resultEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [user]);

  const resetQuiz = useCallback(() => {
    setShowResult(false);
    setCurrentQuizRiskLevel(RiskLevel.NONE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const renderContent = () => {
    if (!user) {
      return <LoginPage onLogin={handleLogin} />;
    }

    if (user.role === 'admin') {
      return <AdminDashboard studentData={studentResults} />;
    }

    if (user.role === 'student') {
      return (
        <>
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg transition-all duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Tự Đánh giá Nguy cơ An toàn Mạng</h1>
              <p className="mt-4 text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">Phân tích hành vi & nhận thức để cảnh báo sớm các hình thức lừa đảo, dụ dỗ, và "bắt cóc online" trong bối cảnh chuyển đổi số.</p>
            </div>
            
            <QuizForm questions={QUIZ_QUESTIONS} onSubmit={handleQuizSubmit} isSubmitted={showResult} />
          </div>

          {showResult && (
            <div id="result-section" className="mt-10 sm:mt-12">
              <ResultDisplay level={currentQuizRiskLevel} onReset={resetQuiz} />
            </div>
          )}
          <HelpButton onClick={openModal} />
          <HelpModal isOpen={isModalOpen} onClose={closeModal} />
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header user={user} onLogout={user ? handleLogout : undefined} />
      <main className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {renderContent()}
      </main>
       <footer className="text-center py-8 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} An Toàn Mạng. Một dự án cộng đồng vì không gian mạng an toàn hơn.</p>
      </footer>
    </div>
  );
}

export default App;
