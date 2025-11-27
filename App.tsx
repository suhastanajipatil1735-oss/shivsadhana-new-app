import React, { useState, useEffect } from 'react';
import { AppScreen, Student } from './types';
import * as storage from './services/storage';
import { GraduationCap, ArrowRight, Lock } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import FeesReminder from './components/FeesReminder';
import ViewStudents from './components/ViewStudents';
import RemoveStudents from './components/RemoveStudents';

function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [students, setStudents] = useState<Student[]>([]);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Initial Load
  useEffect(() => {
    // Simulate Splash Timer
    const timer = setTimeout(() => {
      setScreen(AppScreen.LOGIN);
    }, 2000);

    // Load Data
    const loaded = storage.getStudents();
    setStudents(loaded);

    return () => clearTimeout(timer);
  }, []);

  // --- Actions ---

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'suhaspatilsir') {
      setScreen(AppScreen.DASHBOARD);
      setLoginError(false);
    } else {
      setLoginError(true);
      // Auto hide error after 3s
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  const addStudent = (newStudent: Student) => {
    const updated = storage.addStudent(newStudent);
    setStudents(updated);
    setScreen(AppScreen.DASHBOARD);
  };

  const updateStudent = (updatedStudent: Student) => {
    const updated = storage.updateStudent(updatedStudent);
    setStudents(updated);
  };

  const removeStudent = (id: string) => {
    const updated = storage.removeStudent(id);
    setStudents(updated);
  };

  const goBack = () => setScreen(AppScreen.DASHBOARD);

  // --- Render Views ---

  if (screen === AppScreen.SPLASH) {
    return (
      <div className="fixed inset-0 bg-blue-700 flex flex-col items-center justify-center text-white z-50 animate-pulse">
        <GraduationCap size={80} className="mb-6" />
        <h1 className="text-3xl font-bold text-center px-4 leading-relaxed">
          Shivsadhana Education<br/>Academy
        </h1>
      </div>
    );
  }

  if (screen === AppScreen.LOGIN) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
         <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl">
            <div className="flex justify-center mb-6 text-blue-600">
              <GraduationCap size={48} />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-center text-gray-500 mb-8">Enter your access code</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                Login <ArrowRight size={20} />
              </button>
            </form>
         </div>

         {/* Error Toast */}
         {loginError && (
           <div className="fixed top-10 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
             Incorrect password
           </div>
         )}
      </div>
    );
  }

  // --- Main App Views ---
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Dynamic Header */}
      <Header 
        title={
          screen === AppScreen.DASHBOARD ? "Shivsadhana Academy" :
          screen === AppScreen.ADD_STUDENT ? "Add New Student" :
          screen === AppScreen.FEES_REMINDER ? "Fee Reminders" :
          screen === AppScreen.VIEW_STUDENTS ? "All Students" :
          screen === AppScreen.REMOVE_STUDENTS ? "Remove Students" : "Academy"
        }
        showBack={screen !== AppScreen.DASHBOARD}
        onBack={goBack}
      />

      {/* Screen Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto">
        {screen === AppScreen.DASHBOARD && (
          <Dashboard students={students} onNavigate={setScreen} />
        )}
        
        {screen === AppScreen.ADD_STUDENT && (
          <AddStudent onSave={addStudent} />
        )}

        {screen === AppScreen.FEES_REMINDER && (
          <FeesReminder students={students} />
        )}

        {screen === AppScreen.VIEW_STUDENTS && (
          <ViewStudents students={students} onUpdate={updateStudent} />
        )}

        {screen === AppScreen.REMOVE_STUDENTS && (
          <RemoveStudents students={students} onRemove={removeStudent} />
        )}
      </main>
    </div>
  );
}

export default App;