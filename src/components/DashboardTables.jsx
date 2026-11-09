import DataTable from './DataTable.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';

const engagementsData = [
    { id: 1, name: 'ESCI Test Engagement', program: 'Enterprise Coaching with ESCI', created: '03/19/2024', start: '03/19/2024', end: '05/30/2024', configStatus: 'Draft', activeStatus: 'Active' },
    { id: 2, name: 'sabinTest 14 march 2024', program: 'Leadership Assessment', created: '03/14/2024', start: '03/14/2024', end: '01/31/2025', configStatus: 'Draft', activeStatus: 'Active' },
    { id: 3, name: 'sabinTest 14 may 2024', program: 'Leadership Assessment', created: '03/13/2024', start: '03/13/2024', end: '07/31/2024', configStatus: 'Draft', activeStatus: 'Active' },
    { id: 4, name: 'BUL 1.0 IG CTD and AR', program: 'Leadership Assessment', created: '02/28/2024', start: '02/28/2024', end: '03/31/2024', configStatus: 'Live', activeStatus: 'Active' },
    { id: 5, name: 'BUL 1.0 IG w/ KF360 BARS', program: 'Leadership Assessment', created: '02/20/2024', start: '02/20/2024', end: '02/29/2024', configStatus: 'Live', activeStatus: 'Active' },
];

const projectsData = [
    { id: 1, name: 'BUL Sea Proj', created: '11/01/2023', start: '11/01/2023', end: '11/30/2023', configStatus: 'Live' },
    { id: 2, name: 'Custom', created: '11/01/2024', start: '11/01/2024', end: '11/11/2024', configStatus: 'Draft' },
];

const participantsData = [
    { id: 1, firstName: 'sabin', lastName: 'sab', email: 'sabin@example.com', status: 'Registered', date: '01/05/2024', cohortKey: 'cohort-a-2025', userKey: 'user-001', mmManifestId: 'manifest-001' },
    { id: 2, firstName: 'tester', lastName: 'tester123', email: 'tester123@example.com', status: 'In Progress', date: '01/10/2024', cohortKey: 'cohort-a-2025', userKey: 'user-002', mmManifestId: 'manifest-002' },
    { id: 3, firstName: 'sabin', lastName: 'sabin12', email: 'sabin12@example.com', status: 'Completed', date: '01/12/2024', cohortKey: 'cohort-a-2025', userKey: 'user-003', mmManifestId: 'manifest-003' },
    { id: 4, firstName: 'john', lastName: 'doe', email: 'john.doe@example.com', status: 'Registered', date: '01/15/2024', cohortKey: 'cohort-a-2025', userKey: 'user-004', mmManifestId: 'manifest-004' },
];

export default function DashboardTables() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isAdmin = user.role === 'admin';
    const visibleParticipants = isAdmin
        ? participantsData
        : participantsData.filter((participant) => participant.userKey === user.userKey);
    const openParticipantGrid = (participant) => {
        const { cohortKey, userKey, mmManifestId } = participant;
        navigate(`/participant-integration-grid/${encodeURIComponent(cohortKey)}/${encodeURIComponent(userKey)}/${encodeURIComponent(mmManifestId)}`);
    };

    return (
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
            <div className="max-w-[1600px] mx-auto space-y-2">
                {isAdmin && <DataTable
                    title="Engagement List"
                    headerColor="bg-yellow-400"
                    data={engagementsData}
                    paginationText="1 - 10 of 142"
                    columns={[
                        { key: 'name', label: 'Engagement  Name', sortable: true },
                        { key: 'program', label: 'Program ', sortable: true },
                        { key: 'created', label: 'Created Date', sortable: true },
                        { key: 'start', label: 'Start Date', sortable: true },
                        { key: 'end', label: 'End Date', sortable: true },
                        { key: 'configStatus', label: 'Configuration Status', sortable: true },
                        { key: 'activeStatus', label: 'Active Status', sortable: true },
                    ]}
                />}
                {isAdmin && <DataTable
                    title="Project List"
                    headerColor="bg-purple-500"
                    data={projectsData}
                    paginationText="1 - 2 of 2"
                    columns={[
                        { key: 'name', label: 'Project Name', sortable: true },
                        { key: 'created', label: 'Created Date', sortable: true },
                        { key: 'start', label: 'Start Date', sortable: true },
                        { key: 'end', label: 'End Date', sortable: true },
                        { key: 'configStatus', label: 'Configuration Status', sortable: true },
                    ]}
                />}
                <DataTable
                    title="Participant List"
                    headerColor="bg-blue-500"
                    data={visibleParticipants}
                    onRowClick={openParticipantGrid}
                    paginationText={`1 - ${visibleParticipants.length} of ${visibleParticipants.length}`}
                    columns={[
                        { key: 'firstName', label: 'First Name', sortable: true },
                        { key: 'lastName', label: 'Last Name', sortable: true },
                        { key: 'email', label: 'Email id', sortable: true },
                        { key: 'status', label: 'Status', sortable: true },
                        { key: 'date', label: 'Date', sortable: true },
                    ]}
                />
            </div>
        </div>
    );
}
