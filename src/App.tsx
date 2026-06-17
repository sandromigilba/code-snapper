import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { EditorPage } from './pages/EditorPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { HistoryPage } from './pages/HistoryPage'
import { SettingsPage } from './pages/SettingsPage'
import { WorkspaceLayout } from './components/workspace/WorkspaceLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Workspace App Views (Wrapped in WorkspaceLayout) */}
        <Route
          path="/dashboard"
          element={
            <WorkspaceLayout>
              <Dashboard />
            </WorkspaceLayout>
          }
        />
        <Route
          path="/editor"
          element={
            <WorkspaceLayout>
              <EditorPage />
            </WorkspaceLayout>
          }
        />
        <Route
          path="/templates"
          element={
            <WorkspaceLayout>
              <TemplatesPage />
            </WorkspaceLayout>
          }
        />
        <Route
          path="/history"
          element={
            <WorkspaceLayout>
              <HistoryPage />
            </WorkspaceLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <WorkspaceLayout>
              <SettingsPage />
            </WorkspaceLayout>
          }
        />

        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
