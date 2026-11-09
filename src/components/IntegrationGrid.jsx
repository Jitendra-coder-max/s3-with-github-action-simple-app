import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
    BarChart3, BriefcaseBusiness, CircleHelp, Grid2X2,
    Home, LockKeyhole, MessageCircleWarning, Settings, Users
} from 'lucide-react';
import { useAuth } from '../auth/useAuth.js';

const participants = {
    'user-001': { name: 'Sabin Sab', email: 'sabin@example.com' },
    'user-002': { name: 'Tester Tester123', email: 'tester123@example.com' },
    'user-003': { name: 'Sabin Sabin12', email: 'sabin12@example.com' },
    'user-004': { name: 'John Doe', email: 'john.doe@example.com' },
};

const dimensions = [
    { name: 'Strategic Thinking', weight: '15%', scores: ['4.2', '4.0', '4.5', '4.0'], average: '4.2' },
    { name: 'Communication', weight: '15%', scores: ['4.0', '3.8', '4.2', '3.6'], average: '3.9' },
    { name: 'Team Collaboration', weight: '10%', scores: ['4.5', '4.2', '4.8', '4.1'], average: '4.3' },
    { name: 'Problem Solving', weight: '15%', scores: ['3.8', '3.6', '4.0', '3.5'], average: '3.8' },
    { name: 'Leadership', weight: '10%', scores: ['4.2', '4.0', '4.5', '3.8'], average: '4.0' },
    { name: 'Adaptability', weight: '10%', scores: ['4.1', '3.9', '4.2', '3.7'], average: '3.9' },
    { name: 'Influence', weight: '10%', scores: ['3.9', '3.6', '4.0', '3.4'], average: '3.7' },
    { name: 'Customer Focus', weight: '5%', scores: ['4.3', '4.1', '4.6', '4.0'], average: '4.1' },
    { name: 'Business Acumen', weight: '5%', scores: ['3.7', '3.5', '4.0', '3.3'], average: '3.6' },
    { name: 'Execution', weight: '5%', scores: ['4.0', '3.8', '4.3', '3.7'], average: '3.9' },
];

const methods = [
    { name: '360° Feedback', color: 'text-blue-600', background: 'bg-blue-50' },
    { name: 'Manager Assessment', color: 'text-purple-600', background: 'bg-purple-50' },
    { name: 'Behavioral Interview', color: 'text-emerald-600', background: 'bg-emerald-50' },
    { name: 'Case Study', color: 'text-orange-500', background: 'bg-orange-50' },
];

export default function IntegrationGrid() {
    const { cohortKey, userKey, mmManifestId } = useParams();
    const { user } = useAuth();
    const participant = participants[userKey] ?? { name: userKey, email: '' };
    const [selectedRow, setSelectedRow] = useState(4);
    const [selectedMethod, setSelectedMethod] = useState(methods[0].name);
    const [score, setScore] = useState('4.2');
    const [comment, setComment] = useState('');
    const [isReviewed, setIsReviewed] = useState(false);
    const [saved, setSaved] = useState(false);
    const selectedDimension = dimensions[selectedRow];

    if (user.role !== 'admin' && user.userKey !== userKey) {
        return <Navigate to="/" replace />;
    }

    function selectDimension(index) {
        setSelectedRow(index);
        setScore(dimensions[index].scores[0]);
        setSaved(false);
    }

    function moveToNextDimension() {
        selectDimension((selectedRow + 1) % dimensions.length);
    }

    return (
        <div className="flex h-screen min-h-[600px] overflow-hidden bg-slate-50 font-sans text-slate-800">
            <aside className="flex w-44 shrink-0 flex-col bg-[#10243f] text-white">
                <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4 text-sm font-semibold">
                    <Grid2X2 className="h-5 w-5 text-sky-400" /> Korn Ferry
                </div>
                <nav className="space-y-1 p-2 text-sm">
                    <Link to="/" className="flex items-center gap-3 rounded px-3 py-2 text-slate-300 hover:bg-white/10"><Home size={16} /> Dashboard</Link>
                    <a className="flex items-center gap-3 rounded px-3 py-2 text-slate-300"><BriefcaseBusiness size={16} /> Projects</a>
                    <a className="flex items-center gap-3 rounded px-3 py-2 text-slate-300"><Users size={16} /> Participants</a>
                    <a className="flex items-center gap-3 rounded px-3 py-2 text-slate-300"><BarChart3 size={16} /> Assessments</a>
                    <div className="flex items-center gap-3 rounded bg-blue-600 px-3 py-2 font-medium"><Grid2X2 size={16} /> Integration Grid</div>
                    <a className="flex items-center gap-3 rounded px-3 py-2 text-slate-300"><Settings size={16} /> Settings</a>
                </nav>
            </aside>

            <main className="flex min-w-0 flex-1 flex-col overflow-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Integration Grid</h1>
                        <p className="mt-1 text-xs text-slate-500">Review and edit assessment scores for a participant.</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Editable</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-400" /> Read Only</span>
                        <span className="flex items-center gap-1"><LockKeyhole size={12} className="text-red-500" /> Locked</span>
                        <span className="flex items-center gap-1"><MessageCircleWarning size={12} className="text-orange-500" /> Needs Comment</span>
                    </div>
                </div>

                <div className="grid gap-2 border-b border-slate-200 bg-white p-3 sm:grid-cols-2 xl:grid-cols-4">
                    <label className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Project
                        <select className="mt-1 w-full rounded border border-slate-200 bg-white p-2 text-xs text-slate-700"><option>Leadership Development Program</option></select>
                    </label>
                    <label className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Cohort
                        <select className="mt-1 w-full rounded border border-slate-200 bg-white p-2 text-xs text-slate-700"><option>{cohortKey}</option></select>
                    </label>
                    <label className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Model
                        <select className="mt-1 w-full rounded border border-slate-200 bg-white p-2 text-xs text-slate-700"><option>Leadership Competency Model</option></select>
                    </label>
                    <label className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Participant
                        <select className="mt-1 w-full rounded border border-slate-200 bg-white p-2 text-xs text-slate-700"><option>{participant.name}</option></select>
                    </label>
                </div>

                <div className="min-h-0 flex-1 overflow-auto p-3">
                    <div className="mb-3 flex gap-5 border-b border-slate-200 text-xs">
                        <button className="border-b-2 border-blue-600 pb-2 font-semibold text-blue-700">Integration Grid</button>
                        <button className="pb-2 text-slate-500">Participant Details</button>
                        <button className="pb-2 text-slate-500">Project Details</button>
                        <button className="pb-2 text-slate-500">Model Configuration</button>
                    </div>

                    <div className="grid gap-3 2xl:grid-cols-[minmax(0,1fr)_280px]">
                        <div className="min-w-0 overflow-auto rounded border border-slate-200 bg-white">
                            <table className="w-full min-w-[900px] border-collapse text-left text-[10px]">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-700">
                                        <th rowSpan="2" className="p-2">#</th>
                                        <th rowSpan="2" className="p-2">Competency / Dimension</th>
                                        <th rowSpan="2" className="p-2">Weightage</th>
                                        {methods.map((method) => (
                                            <th key={method.name} colSpan="2" className={`p-2 text-center ${method.background} ${method.color}`}>{method.name}</th>
                                        ))}
                                        <th rowSpan="2" className="p-2 text-center">Derived Avg</th>
                                        <th rowSpan="2" className="p-2 text-center">Final Score</th>
                                    </tr>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                                        {methods.flatMap((method) => ['Score', 'Avg'].map((label, index) => (
                                            <th key={`${method.name}-${label}`} className={`p-2 text-center ${index === 0 ? 'border-l border-slate-200' : ''}`}>{label}</th>
                                        )))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dimensions.map((dimension, index) => (
                                        <tr
                                            key={dimension.name}
                                            onClick={() => selectDimension(index)}
                                            className={`cursor-pointer border-b border-slate-100 hover:bg-blue-50 ${selectedRow === index ? 'bg-blue-50' : ''}`}
                                        >
                                            <td className="p-2 text-slate-500">{index + 1}</td>
                                            <td className="p-2 font-medium text-slate-700">{dimension.name}</td>
                                            <td className="p-2">{dimension.weight}</td>
                                            {dimension.scores.map((value, methodIndex) => (
                                                <td key={`${dimension.name}-${methodIndex}`} className="border-l border-slate-100 p-2 text-center">
                                                    <span className="mr-1 text-emerald-500">●</span>{value}
                                                </td>
                                            ))}
                                            <td className="p-2 text-center font-semibold">{dimension.average}</td>
                                            <td className="p-2 text-center font-semibold">{dimension.average}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot><tr className="bg-slate-50 font-semibold"><td></td><td className="p-2">Total</td><td className="p-2">100%</td><td colSpan="8"></td><td className="p-2 text-center">3.9</td><td className="p-2 text-center">3.9</td></tr></tfoot>
                            </table>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 p-2 text-xs">
                                <span className="font-medium text-slate-600">Selected Row: {selectedRow + 1} - {selectedDimension.name}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => setSaved(false)} className="rounded border border-blue-300 px-3 py-1.5 text-blue-700">Cancel</button>
                                    <button onClick={() => setSaved(true)} className="rounded bg-blue-600 px-4 py-1.5 font-medium text-white">{saved ? 'Saved' : 'Save'}</button>
                                    <button onClick={moveToNextDimension} className="rounded border border-blue-300 px-3 py-1.5 text-blue-700">Next Row →</button>
                                </div>
                            </div>
                        </div>

                        <section className="rounded border border-slate-200 bg-white p-3 text-xs">
                            <h2 className="mb-3 text-sm font-semibold">Edit Score - {selectedDimension.name}</h2>
                            <div className="mb-3 flex gap-2 rounded border border-orange-200 bg-orange-50 p-2 text-[10px] text-orange-900">
                                <MessageCircleWarning className="h-4 w-4 shrink-0 text-orange-600" />
                                This score requires a justification comment because the difference is more than 10%.
                            </div>
                            <label className="mb-3 block text-slate-500">Method
                                <select value={selectedMethod} onChange={(event) => setSelectedMethod(event.target.value)} className="mt-1 w-full rounded border border-slate-200 bg-white p-2 text-slate-700">
                                    {methods.map((method) => <option key={method.name}>{method.name}</option>)}
                                </select>
                            </label>
                            <label className="mb-3 block text-slate-500">Score
                                <div className="mt-1 flex items-center gap-2">
                                    <input type="number" min="0" max="5" step="0.1" value={score} onChange={(event) => { setScore(event.target.value); setSaved(false); }} className="w-full rounded border border-slate-200 p-2 text-slate-800" />
                                    <span>/ 5</span>
                                </div>
                            </label>
                            <div className="mb-3 grid grid-cols-2 gap-2 text-slate-500">
                                <div>Previous Score<p className="mt-1 text-slate-700">{selectedDimension.average}</p></div>
                                <div>Difference<p className="mt-1 text-red-600">+0.5 (13.5%)</p></div>
                            </div>
                            <label className="block text-slate-500">Justification Comment *
                                <textarea value={comment} onChange={(event) => { setComment(event.target.value); setSaved(false); }} rows="4" className="mt-1 w-full resize-y rounded border border-slate-200 p-2 text-slate-700" placeholder="Add a justification for this score..." />
                            </label>
                            <label className="mt-3 flex items-center gap-2 text-slate-600">
                                <input type="checkbox" checked={isReviewed} onChange={(event) => setIsReviewed(event.target.checked)} />
                                Mark as reviewed
                            </label>
                            <div className="mt-4 flex items-start gap-2 rounded border border-slate-200 bg-slate-50 p-2 text-[10px] text-slate-500">
                                <CircleHelp size={14} /> Participant: {participant.name} ({participant.email || userKey})
                            </div>
                            <div className="mt-2 break-all text-[10px] text-slate-400">Manifest: {mmManifestId}</div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
