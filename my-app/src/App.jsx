import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChooseModule from "./screens/chooseStage";
import CustomerInfo from "./policy creation/customerInfo";
import Login from "./auth/login";
import Dashboard from "./components/dashboard";
import DeviceInfo from "./policy creation/deviceInfo";
import InsuranceCategory from "./policy creation/InsuranceCategory";
import RiskQuestionnaire from "./policy creation/risk-questionaire";
import { Perils } from "./policy creation/perils";
import TemporaryCNWithQuote from "./policy creation/TCN";
import IssuePolicy from "./policy creation/issuePolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseModule />} />
        <Route
          path="policy-creation/customer-info"
          element={<CustomerInfo />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/policy-creation/device-info" element={<DeviceInfo />} />
        <Route path="policy-creation/" element={<InsuranceCategory />} />
        <Route
          path="policy-creation/risk-questionaire"
          element={<RiskQuestionnaire />}
        />
        <Route path="policy-creation/perils" element={<Perils />} />
        <Route path="policy-creation/tcn" element={<TemporaryCNWithQuote />} />
        <Route path="policy-creation/issue-policy" element={<IssuePolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
