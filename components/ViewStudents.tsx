import React, { useState } from 'react';
import { Student, CLASS_OPTIONS } from '../types';
import { Search, X, Edit2, Save } from 'lucide-react';

interface ViewStudentsProps {
  students: Student[];
  onUpdate: (student: Student) => void;
}

const ViewStudents: React.FC<ViewStudentsProps> = ({ students, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Edit State
  const [editForm, setEditForm] = useState<Partial<Student>>({});

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setEditForm({ ...student });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingId && editForm.name) {
      onUpdate(editForm as Student);
      setEditingId(null);
    }
  };

  return (
    <div className="p-4 animate-fade-in pb-20">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="space-y-4">
        {filteredStudents.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No students found.</div>
        )}

        {filteredStudents.map(student => {
          const isEditing = editingId === student.id;
          const due = student.totalFees - student.feesPaid;

          if (isEditing) {
            return (
              <div key={student.id} className="bg-white p-4 rounded-xl shadow-lg border-2 border-blue-500 space-y-3">
                <input 
                  value={editForm.name} 
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full p-2 border rounded" 
                  placeholder="Name"
                />
                <select
                   value={editForm.className}
                   onChange={e => setEditForm({...editForm, className: e.target.value})}
                   className="w-full p-2 border rounded"
                >
                  {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">Total Fees</label>
                    <input 
                      type="number" 
                      value={editForm.totalFees} 
                      onChange={e => setEditForm({...editForm, totalFees: Number(e.target.value)})}
                      className="w-full p-2 border rounded" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Paid Fees</label>
                    <input 
                      type="number" 
                      value={editForm.feesPaid} 
                      onChange={e => setEditForm({...editForm, feesPaid: Number(e.target.value)})}
                      className="w-full p-2 border rounded" 
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={saveEdit} className="flex-1 bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2">
                    <Save size={16} /> Save
                  </button>
                  <button onClick={cancelEdit} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded flex items-center justify-center gap-2">
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key={student.id} onClick={() => startEdit(student)} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{student.name}</h3>
                  <div className="text-sm text-gray-500 font-medium inline-block bg-gray-100 px-2 py-0.5 rounded mt-1">
                    Class: {student.className}
                  </div>
                </div>
                <Edit2 size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4" />
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-xs text-blue-600">Total</div>
                  <div className="font-bold text-blue-800">₹{student.totalFees}</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-xs text-green-600">Paid</div>
                  <div className="font-bold text-green-800">₹{student.feesPaid}</div>
                </div>
                <div className={`p-2 rounded ${due > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                  <div className={`text-xs ${due > 0 ? 'text-red-600' : 'text-gray-500'}`}>Due</div>
                  <div className={`font-bold ${due > 0 ? 'text-red-700' : 'text-gray-600'}`}>₹{due}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewStudents;