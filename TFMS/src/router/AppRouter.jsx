import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { createAction } from "../components/ui/auths/LoginForm.jsx";

import AppLayout from "../layout/AppLayout.jsx";
import RootLayout from "../layout/RootLayout.jsx";
import DashBoard from "../pages/DashBoard.jsx";

import LoginPage from "../pages/LoginPage.jsx";

// --- TFMS PAGES (you will create these gradually) ---
// import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
// import DashboardAnalytics from "./pages/dashboard/DashboardAnalytics.jsx";

// import TankView from "./pages/tanks/TankView.jsx";
// import TankLiveData from "./pages/tanks/TankLiveData.jsx";
// import TankMaster from "./pages/tanks/TankMaster.jsx";

// import HostTFMS from "./pages/sap/HostTFMS.jsx";

// import TankAlarms from "./pages/alarms/TankAlarms.jsx";
// import SystemAlarms from "./pages/alarms/SystemAlarms.jsx";

// import EventLog from "./pages/events/EventLog.jsx";
// import SystemEvents from "./pages/events/SystemEvents.jsx";

// import ReportsTank from "./pages/reports/ReportsTank.jsx";
// import ReportsTransactions from "./pages/reports/ReportsTransactions.jsx";
// import ReportsAudit from "./pages/reports/ReportsAudit.jsx";

// import Users from "./pages/users/Users.jsx";
// import Roles from "./pages/users/Roles.jsx";
// import Sessions from "./pages/users/Sessions.jsx";

// import ConfigGeneral from "./pages/config/ConfigGeneral.jsx";
// import ConfigSession from "./pages/config/ConfigSession.jsx";
// import ConfigAudit from "./pages/config/ConfigAudit.jsx";

// ------------------------ ROUTER DEFINITION ------------------------

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      {/* ---------------- LOGIN ROUTE ---------------- */}
      <Route
        index
        element={<LoginPage />}
        action={createAction}
      />


      {/* ---------------- TFMS APP ROUTES ---------------- */}
      <Route path="app" element={<AppLayout />}>

        <Route path="dashboard" element={<DashBoard />} />
        {/* <Route path="dashboard" element={<DashboardMain />} />
        <Route path="dashboard/analytics" element={<DashboardAnalytics />} /> */}

        {/* TANK MANAGEMENT */}
        {/* <Route path="tanks/view" element={<TankView />} />
        <Route path="tanks/live-data" element={<TankLiveData />} />
        <Route path="tanks/master" element={<TankMaster />} /> */}

        {/* SAP – TFMS */}
        {/* <Route path="sap-tfms/host-tfms" element={<HostTFMS />} /> */}

        {/* ALARMS */}
        {/* <Route path="alarms/tanks" element={<TankAlarms />} />
        <Route path="alarms/system" element={<SystemAlarms />} /> */}

        {/* EVENTS */}
        {/* <Route path="events/logs" element={<EventLog />} />
        <Route path="events/system" element={<SystemEvents />} /> */}

        {/* REPORTS */}
        {/* <Route path="reports/tanks" element={<ReportsTank />} />
        <Route path="reports/transactions" element={<ReportsTransactions />} />
        <Route path="reports/audit-trail" element={<ReportsAudit />} /> */}

        {/* USERS MANAGEMENT */}
        {/* <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="users/sessions" element={<Sessions />} /> */}

        {/* SYSTEM CONFIG */}
        {/* <Route path="config/general" element={<ConfigGeneral />} />
        <Route path="config/session" element={<ConfigSession />} />
        <Route path="config/audit" element={<ConfigAudit />} /> */}

      </Route>

    </Route>
  )
);

export default router;
