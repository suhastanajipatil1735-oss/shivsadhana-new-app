import React, { useState, useEffect } from 'react';
import { Student, CLASS_OPTIONS } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Save } from 'lucide-react';

interface AddStudentProps {
  onSave: (student: Student) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState(CLASS_OPTIONS[0]);
  const [totalFees, setTotalFees] = useState<number | ''>('');
  const [feesPaid, setFeesPaid] = useState<number | ''>('');
  const [dueFees, setDueFees] = useState(0);

  // Auto calculate due fees
  useEffect(() => {
    const total = Number(totalFees) || 0;
    const paid = Number(feesPaid) || 0;
    setDueFees(Math.max(0, total - paid));
  }, [totalFees, feesPaid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || totalFees === '') return;

    const newStudent: Student = {
      id: uuidv4(),
      name,
      className,
      totalFees: Number(totalFees),
      feesPaid: Number(feesPaid) || 0,
      dateJoined: new Date().toISOString(),
    };

    onSave(newStudent);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2">Student Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Class</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {CLASS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt} Std</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Total Fees</label>
              <input
                type="number"
                required
                min="0"
                value={totalFees}
                onChange={(e) => setTotalFees(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="₹"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fees Paid</label>
              <input
                type="number"
                min="0"
                value={feesPaid}
                onChange={(e) => setFeesPaid(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="₹"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-600 font-medium">Due Amount:</span>
            <span className={`text-xl font-bold ${dueFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
              ₹{dueFees.toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;