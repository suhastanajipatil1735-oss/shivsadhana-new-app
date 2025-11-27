import React, { useState } from 'react';
import { Student, CLASS_OPTIONS } from '../types';
import { Trash2, Filter } from 'lucide-react';

interface RemoveStudentsProps {
  students: Student[];
  onRemove: (id: string) => void;
}

const RemoveStudents: React.FC<RemoveStudentsProps> = ({ students, onRemove }) => {
  const [selectedClass, setSelectedClass] = useState<string>('All');

  const filteredStudents = selectedClass === 'All' 
    ? students 
    : students.filter(s => s.className === selectedClass);

  const handleRemove = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name}? This cannot be undone.`)) {
      onRemove(id);
    }
  };

  return (
    <div className="p-4 animate-fade-in pb-20">
      {/* Filter */}
      <div className="bg-white p-3 rounded-xl shadow-sm mb-6 flex items-center gap-3">
        <Filter className="text-blue-500" size={20} />
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-700 font-medium"
        >
          <option value="All">All Classes</option>
          {CLASS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt} Std</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredStudents.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No students found in this class.</div>
        )}

        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{student.name}</h3>
              <p className="text-sm text-gray-500">{student.className} Std</p>
            </div>
            <button 
              onClick={() => handleRemove(student.id, student.name)}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveStudents;