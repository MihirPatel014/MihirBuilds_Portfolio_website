import { createBrowserRouter } from "react-router";
import { Root } from "./layouts/Root";
import { Home } from "./pages/Home";
import { WhatsAppAutomation } from "./pages/WhatsAppAutomation";
import { EmailAutomation } from "./pages/EmailAutomation";
import { WorkflowAutomation } from "./pages/WorkflowAutomation";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "whatsapp-automation", Component: WhatsAppAutomation },
      { path: "email-automation", Component: EmailAutomation },
      { path: "workflow-automation", Component: WorkflowAutomation },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
]);
