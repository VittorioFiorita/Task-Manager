import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import TaskDetail from "./pages/TaskDetail"
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/tasks" element={<Tasks />}/>
            <Route path="/tasks/:id" element={<TaskDetail />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App