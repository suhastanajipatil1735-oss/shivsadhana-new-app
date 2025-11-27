import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid 
} from 'recharts';
import { Users, CreditCard, UserPlus, FileText, Trash2, Search } from 'lucide-react';
import { Student, AppScreen } from '../types';

interface DashboardProps {
  students: Student[];
  onNavigate: (screen: AppScreen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ students, onNavigate }) => {
  
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const totalFees = students.reduce((sum, s) => sum + s.totalFees, 0);
    const totalPaid = students.reduce((sum, s) => sum + s.feesPaid, 0);
    const totalDue = totalFees - totalPaid;
    
    // Group by class for charts
    const classDataMap: Record<string, { name: string, count: number, collection: number }> = {};
    
    students.forEach(s => {
      if (!classDataMap[s.className]) {
        classDataMap[s.className] = { name: s.className, count: 0, collection: 0 };
      }
      classDataMap[s.className].count += 1;
      classDataMap[s.className].collection += s.feesPaid;
    });

    const chartData = Object.values(classDataMap).sort((a, b) => a.name.localeCompare(b.name));

    return { totalStudents, totalPaid, totalDue, chartData };
  }, [students]);

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="text-gray-500 text-xs font-medium uppercase mb-1">Total Students</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalStudents}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="text-gray-500 text-xs font-medium uppercase mb-1">Fees Collected</div>
          <div className="text-xl font-bold text-green-600">₹{stats.totalPaid.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500 col-span-2">
          <div className="text-gray-500 text-xs font-medium uppercase mb-1">Total Due Amount</div>
          <div className="text-3xl font-bold text-red-600">₹{stats.totalDue.toLocaleString()}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Students per Class</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <XAxis dataKey="name" tick={{fontSize: 12}} />
              <YAxis allowDecimals={false} tick={{fontSize: 12}} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Collection Trend (by Class)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Line type="monotone" dataKey="collection" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onNavigate(AppScreen.ADD_STUDENT)}
          className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <UserPlus size={24} className="mb-2" />
          <span className="text-sm font-medium">Add Student</span>
        </button>

        <button 
          onClick={() => onNavigate(AppScreen.FEES_REMINDER)}
          className="flex flex-col items-center justify-center p-4 bg-green-600 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <CreditCard size={24} className="mb-2" />
          <span className="text-sm font-medium">Fee Reminders</span>
        </button>

        <button 
          onClick={() => onNavigate(AppScreen.VIEW_STUDENTS)}
          className="flex flex-col items-center justify-center p-4 bg-purple-600 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <Search size={24} className="mb-2" />
          <span className="text-sm font-medium">View All</span>
        </button>

        <button 
          onClick={() => onNavigate(AppScreen.REMOVE_STUDENTS)}
          className="flex flex-col items-center justify-center p-4 bg-red-500 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <Trash2 size={24} className="mb-2" />
          <span className="text-sm font-medium">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;