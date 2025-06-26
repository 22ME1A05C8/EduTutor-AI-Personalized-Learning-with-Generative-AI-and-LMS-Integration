"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Users,
  BookOpen,
  BarChart3,
  Play,
  History,
  Trophy,
  Clock,
  Star,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  User,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  Menu,
  X,
  MessageCircle,
  Send,
  Bot,
  Plus,
  Settings,
  UserCheck,
  CalendarPlus,
  GraduationCap,
  Phone,
  MapPin,
  ExternalLink,
  FolderSyncIcon as Sync,
  Eye,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react"

export default function EduTutorAI() {
  const [currentView, setCurrentView] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("student")
  const [currentUser, setCurrentUser] = useState(null)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message:
        "Hello! I'm your AI learning assistant powered by ChatGPT. I can help you with any subject - math, science, history, literature, and more. What would you like to learn about today?",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Shared state for students and their quiz results
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "password123",
      phone: "123-456-7890",
      address: "123 Main St",
      joinDate: "2024-01-10",
      userType: "student",
      quizResults: [
        { quizId: 1, topic: "Mathematics", score: 85, date: "2024-01-15", status: "completed" },
        { quizId: 2, topic: "Science", score: 92, date: "2024-01-14", status: "completed" },
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      password: "password123",
      phone: "234-567-8901",
      address: "456 Oak Ave",
      joinDate: "2024-01-12",
      userType: "student",
      quizResults: [{ quizId: 3, topic: "History", score: 78, date: "2024-01-13", status: "completed" }],
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      password: "password123",
      phone: "345-678-9012",
      address: "789 Pine Rd",
      joinDate: "2024-01-15",
      userType: "student",
      quizResults: [
        { quizId: 2, topic: "Physics", score: 96, date: "2024-01-16", status: "completed" },
        { quizId: 1, topic: "Chemistry", score: 92, date: "2024-01-17", status: "completed" },
      ],
    },
  ])

  // Add educators to the students array for login
  const [allUsers, setAllUsers] = useState([
    ...students,
    {
      id: 100,
      name: "Dr. Sarah Wilson",
      email: "educator@example.com",
      password: "educator123",
      phone: "555-123-4567",
      address: "University Campus",
      joinDate: "2024-01-01",
      userType: "educator",
    },
  ])

  const [scheduledQuizzes, setScheduledQuizzes] = useState([
    {
      id: 1,
      title: "Mathematics Quiz - Algebra",
      topic: "Algebra",
      difficulty: "medium",
      scheduledDate: "2024-01-20",
      scheduledTime: "10:00",
      duration: 30,
      status: "scheduled",
      questions: 5,
      completedBy: [1, 2], // student IDs who completed
    },
    {
      id: 2,
      title: "Science Quiz - Physics",
      topic: "Physics",
      difficulty: "hard",
      scheduledDate: "2024-01-22",
      scheduledTime: "14:00",
      duration: 45,
      status: "scheduled",
      questions: 8,
      completedBy: [3],
    },
    {
      id: 3,
      title: "History Quiz - World War II",
      topic: "History",
      difficulty: "easy",
      scheduledDate: "2024-01-25",
      scheduledTime: "09:00",
      duration: 25,
      status: "draft",
      questions: 6,
      completedBy: [],
    },
  ])

  const [googleClassrooms, setGoogleClassrooms] = useState([
    {
      id: "class_1",
      name: "Advanced Mathematics",
      section: "Grade 12A",
      students: 28,
      status: "active",
      lastSync: "2024-01-18 10:30",
      isLive: true,
    },
    {
      id: "class_2",
      name: "Physics Fundamentals",
      section: "Grade 11B",
      students: 24,
      status: "active",
      lastSync: "2024-01-18 09:15",
      isLive: true,
    },
    {
      id: "class_3",
      name: "World History",
      section: "Grade 10C",
      students: 32,
      status: "syncing",
      lastSync: "2024-01-18 11:45",
      isLive: false,
    },
  ])

  const sampleQuizQuestions = [
    {
      question: "What is the derivative of x²?",
      options: ["2x", "x²", "2", "x"],
      correct: 0,
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: 1,
    },
    {
      question: "What year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
    },
  ]

  // Update allUsers when students change
  useEffect(() => {
    setAllUsers([
      ...students,
      {
        id: 100,
        name: "Dr. Sarah Wilson",
        email: "educator@example.com",
        password: "educator123",
        phone: "555-123-4567",
        address: "University Campus",
        joinDate: "2024-01-01",
        userType: "educator",
      },
    ])
  }, [students])

  const handleLogin = (email, password, type) => {
    const user = allUsers.find((u) => u.email === email && u.password === password && u.userType === type)

    if (user) {
      setIsLoggedIn(true)
      setUserType(type)
      setCurrentUser(user)
      setCurrentView(type === "student" ? "student-dashboard" : "educator-dashboard")
      return true
    }
    return false
  }

  const handleRegister = (formData) => {
    // Add new student to the students list
    const newStudent = {
      id: students.length + 1,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || "Not provided",
      address: formData.address || "Not provided",
      joinDate: new Date().toISOString().split("T")[0],
      userType: formData.userType,
      quizResults: [],
    }

    if (formData.userType === "student") {
      setStudents([...students, newStudent])
    }

    // Auto-login after successful registration
    setCurrentUser(newStudent)
    setIsLoggedIn(true)
    setUserType(formData.userType)
    setCurrentView(formData.userType === "student" ? "student-dashboard" : "educator-dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setCurrentView("home")
    setCurrentQuiz(null)
    setQuizAnswers([])
    setCurrentQuestion(0)
  }

  const startQuiz = (quiz) => {
    setCurrentQuiz({
      ...quiz,
      questions: sampleQuizQuestions,
    })
    setQuizAnswers(new Array(sampleQuizQuestions.length).fill(null))
    setCurrentQuestion(0)
    setCurrentView("take-quiz")
  }

  const submitQuiz = () => {
    const score = Math.floor(Math.random() * 40) + 60 // Random score between 60-100

    // Update student's quiz results
    const updatedStudents = students.map((student) => {
      if (student.id === currentUser.id) {
        return {
          ...student,
          quizResults: [
            ...student.quizResults,
            {
              quizId: currentQuiz.id,
              topic: currentQuiz.topic,
              score: score,
              date: new Date().toISOString().split("T")[0],
              status: "completed",
            },
          ],
        }
      }
      return student
    })
    setStudents(updatedStudents)

    // Mark quiz as completed for current student
    const updatedQuizzes = scheduledQuizzes.map((quiz) => {
      if (quiz.id === currentQuiz.id) {
        return {
          ...quiz,
          completedBy: [...quiz.completedBy, currentUser.id],
        }
      }
      return quiz
    })
    setScheduledQuizzes(updatedQuizzes)

    // Update current user
    const updatedUser = updatedStudents.find((s) => s.id === currentUser.id)
    setCurrentUser(updatedUser)

    setCurrentView("quiz-results")
  }

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatInput("")

    // Add user message
    const newMessages = [...chatMessages, { type: "user", message: userMessage }]
    setChatMessages(newMessages)

    // Show typing indicator
    setIsTyping(true)

    // Simulate ChatGPT API call with realistic responses
    setTimeout(() => {
      const aiResponse = getChatGPTResponse(userMessage)
      setChatMessages([...newMessages, { type: "bot", message: aiResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const getChatGPTResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    // Math responses
    if (
      lowerMessage.includes("math") ||
      lowerMessage.includes("algebra") ||
      lowerMessage.includes("calculus") ||
      lowerMessage.includes("geometry") ||
      lowerMessage.includes("equation")
    ) {
      const mathResponses = [
        "I'd be happy to help with mathematics! Whether it's algebra, calculus, geometry, or any other math topic, I can explain concepts, solve problems step-by-step, and provide practice examples. What specific math topic would you like to work on?",
        "Mathematics is all about patterns and logic! I can help you understand formulas, work through equations, explain theorems, and break down complex problems into manageable steps. What math concept are you struggling with?",
        "Let's tackle that math problem together! I can guide you through solving equations, understanding functions, working with graphs, or any other mathematical concept. Share your specific question and I'll help you understand it step by step.",
      ]
      return mathResponses[Math.floor(Math.random() * mathResponses.length)]
    }

    // Science responses
    if (
      lowerMessage.includes("science") ||
      lowerMessage.includes("physics") ||
      lowerMessage.includes("chemistry") ||
      lowerMessage.includes("biology") ||
      lowerMessage.includes("photosynthesis") ||
      lowerMessage.includes("atom")
    ) {
      const scienceResponses = [
        "Science is fascinating! I can help you understand concepts in physics, chemistry, biology, and other sciences. I can explain theories, help with lab work, solve problems, and make complex topics easier to understand. What science topic interests you?",
        "Let's explore the world of science together! Whether it's understanding chemical reactions, learning about the human body, exploring physics laws, or studying ecosystems, I'm here to help. What would you like to learn about?",
        "Science helps us understand how the world works! I can explain scientific concepts, help with experiments, discuss discoveries, and answer your questions about any scientific topic. What are you curious about?",
      ]
      return scienceResponses[Math.floor(Math.random() * scienceResponses.length)]
    }

    // History responses
    if (
      lowerMessage.includes("history") ||
      lowerMessage.includes("war") ||
      lowerMessage.includes("ancient") ||
      lowerMessage.includes("world war")
    ) {
      const historyResponses = [
        "History helps us understand our world! I can discuss any historical period, explain events and their causes, analyze historical figures, and help you understand the connections between past and present. Which historical topic would you like to explore?",
        "Let's journey through history together! I can help you understand different civilizations, major events, important figures, and how historical events shaped our modern world. What period or event interests you?",
        "History is full of amazing stories and lessons! I can explain historical contexts, discuss causes and effects of events, and help you understand how the past influences the present. What would you like to learn about?",
      ]
      return historyResponses[Math.floor(Math.random() * historyResponses.length)]
    }

    // Study help
    if (
      lowerMessage.includes("study") ||
      lowerMessage.includes("exam") ||
      lowerMessage.includes("test") ||
      lowerMessage.includes("homework")
    ) {
      const studyResponses = [
        "I can definitely help you study more effectively! I can create study plans, explain difficult concepts, provide practice questions, suggest memory techniques, and help you prepare for exams. What subject are you studying for?",
        "Great! I'm here to help with your studies. I can break down complex topics, provide examples, help you understand assignments, and give you study strategies. What do you need help with?",
        "Let's make studying more effective! I can help you organize your study materials, explain concepts you're struggling with, create practice questions, and develop good study habits. What subject or topic would you like to focus on?",
      ]
      return studyResponses[Math.floor(Math.random() * studyResponses.length)]
    }

    // Specific subject help
    if (lowerMessage.includes("help me with")) {
      return "I'm here to help! I can assist with any subject including mathematics, science, history, literature, languages, and more. I can explain concepts, solve problems, provide examples, and guide you through your learning. What specific topic do you need help with?"
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! I'm powered by ChatGPT and can help you with a wide range of subjects including math, science, history, literature, and more. Could you tell me more about what you'd like to learn?",
      "I'm here to help you learn and understand any topic! Whether it's solving math problems, explaining scientific concepts, discussing historical events, or helping with writing, I can provide detailed explanations and examples. What would you like to explore?",
      "Great question! As your AI tutor, I can break down complex topics into simpler parts, provide step-by-step explanations, and help you practice. I cover all academic subjects and can adapt to your learning style. What subject interests you most?",
      "I love helping students learn! I can assist with homework, explain difficult concepts, provide study strategies, and answer questions across all subjects. My goal is to help you understand, not just memorize. What can I help you with today?",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const generateQuiz = (quizData) => {
    const newQuiz = {
      id: scheduledQuizzes.length + 1,
      title: quizData.title,
      topic: quizData.topic,
      difficulty: quizData.difficulty,
      scheduledDate: "",
      scheduledTime: "",
      duration: 30,
      status: "draft",
      questions: quizData.numQuestions,
      completedBy: [],
    }
    setScheduledQuizzes([...scheduledQuizzes, newQuiz])
    return newQuiz
  }

  const scheduleQuiz = (quizId, scheduleData) => {
    const updatedQuizzes = scheduledQuizzes.map((quiz) => {
      if (quiz.id === Number.parseInt(quizId)) {
        return {
          ...quiz,
          scheduledDate: scheduleData.date,
          scheduledTime: scheduleData.time,
          duration: scheduleData.duration,
          status: "scheduled",
        }
      }
      return quiz
    })
    setScheduledQuizzes(updatedQuizzes)
  }

  const deleteQuiz = (quizId) => {
    setScheduledQuizzes(scheduledQuizzes.filter((quiz) => quiz.id !== quizId))
  }

  const syncGoogleClassroom = (classId) => {
    setGoogleClassrooms(
      googleClassrooms.map((classroom) => {
        if (classroom.id === classId) {
          return {
            ...classroom,
            status: "syncing",
            lastSync: new Date().toLocaleString(),
          }
        }
        return classroom
      }),
    )

    // Simulate sync completion
    setTimeout(() => {
      setGoogleClassrooms((prev) =>
        prev.map((classroom) => {
          if (classroom.id === classId) {
            return {
              ...classroom,
              status: "active",
              isLive: true,
            }
          }
          return classroom
        }),
      )
    }, 3000)
  }

  const Navigation = () => (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8" />
            <span className="text-xl font-bold">EduTutor AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">Welcome, {currentUser?.name}</span>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-blue-700"
                  onClick={() => setCurrentView(userType === "student" ? "student-dashboard" : "educator-dashboard")}
                >
                  Dashboard
                </Button>
                {userType === "student" ? (
                  <>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("available-quizzes")}
                    >
                      Available Quizzes
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("quiz-history")}
                    >
                      History
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("ai-assistant")}
                    >
                      AI Assistant
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("quiz-section")}
                    >
                      Quiz Section
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("generate-quiz")}
                    >
                      Generate Quiz
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("schedule-quiz")}
                    >
                      Manage Quizzes
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("student-details")}
                    >
                      Student Details
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-blue-700"
                      onClick={() => setCurrentView("google-classroom")}
                    >
                      Google Classroom
                    </Button>
                  </>
                )}
                <Button variant="outline" className="text-blue-600 border-white hover:bg-white" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-blue-700"
                  onClick={() => setCurrentView("login")}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="text-blue-600 border-white hover:bg-white"
                  onClick={() => setCurrentView("register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="text-sm px-4 py-2">Welcome, {currentUser?.name}</div>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-blue-700"
                  onClick={() => {
                    setCurrentView(userType === "student" ? "student-dashboard" : "educator-dashboard")
                    setMobileMenuOpen(false)
                  }}
                >
                  Dashboard
                </Button>
                {userType === "student" ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("available-quizzes")
                        setMobileMenuOpen(false)
                      }}
                    >
                      Available Quizzes
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("quiz-history")
                        setMobileMenuOpen(false)
                      }}
                    >
                      History
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("ai-assistant")
                        setMobileMenuOpen(false)
                      }}
                    >
                      AI Assistant
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("quiz-section")
                        setMobileMenuOpen(false)
                      }}
                    >
                      Quiz Section
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("generate-quiz")
                        setMobileMenuOpen(false)
                      }}
                    >
                      Generate Quiz
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("schedule-quiz")
                        setMobileMenuOpen(false)
                      }}
                    >
                      Manage Quizzes
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("student-details")
                        setMobileMenuOpen(false)
                      }}
                    >
                      Student Details
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-left text-white hover:bg-blue-700"
                      onClick={() => {
                        setCurrentView("google-classroom")
                        setMobileMenuOpen(false)
                      }}
                    >
                      Google Classroom
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-blue-700"
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-blue-700"
                  onClick={() => {
                    setCurrentView("login")
                    setMobileMenuOpen(false)
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-blue-700"
                  onClick={() => {
                    setCurrentView("register")
                    setMobileMenuOpen(false)
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                EduTutor AI
                <span className="block text-blue-600">Personalized Learning Platform</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Revolutionary AI-powered education platform that provides dynamic quiz generation, student evaluation,
                live Google Classroom integration, and real-time feedback powered by ChatGPT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setCurrentView("register")}>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => setCurrentView("login")}>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <div className="text-center">
                  <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">AI-Powered Learning</h3>
                  <p className="text-gray-600">Powered by IBM Watsonx, Granite models, and ChatGPT</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Dynamic Quiz Generation",
                description: "Educators create AI-generated quizzes tailored to learning needs and difficulty levels.",
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Real-time Analytics",
                description: "Track progress and performance with detailed analytics and insights.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Live Google Classroom",
                description: "Real-time integration with Google Classroom for seamless course management.",
              },
              {
                icon: <Bot className="h-8 w-8" />,
                title: "ChatGPT AI Assistant",
                description: "Personal AI learning assistant powered by ChatGPT to help students with studies.",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Credentials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Try Demo Accounts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Student Account</h3>
              <div className="space-y-2 text-left">
                <p>
                  <strong>Email:</strong> alice@example.com
                </p>
                <p>
                  <strong>Password:</strong> password123
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-600">Educator Account</h3>
              <div className="space-y-2 text-left">
                <p>
                  <strong>Email:</strong> educator@example.com
                </p>
                <p>
                  <strong>Password:</strong> educator123
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginType, setLoginType] = useState("student")
    const [error, setError] = useState("")

    const handleSubmit = () => {
      const success = handleLogin(email, password, loginType)
      if (!success) {
        setError("Invalid email, password, or account type. Please try again.")
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your EduTutor AI account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <AlertCircle className="h-5 w-5 text-red-600 mx-auto mb-2" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account Type</label>
              <Tabs value={loginType} onValueChange={setLoginType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="educator">Educator</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button className="text-blue-600 hover:underline" onClick={() => setCurrentView("register")}>
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const RegisterPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      userType: "student",
    })

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Join EduTutor AI</CardTitle>
            <p className="text-gray-600">Create your account to start learning</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter your address"
                  className="pl-10"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Create a password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account Type</label>
              <Tabs value={formData.userType} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="educator">Educator</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleRegister(formData)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button className="text-blue-600 hover:underline" onClick={() => setCurrentView("login")}>
                  Sign in here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const StudentDashboard = () => {
    const currentStudent = students.find((s) => s.id === currentUser?.id)
    const avgScore =
      currentStudent?.quizResults.length > 0
        ? currentStudent.quizResults.reduce((sum, quiz) => sum + quiz.score, 0) / currentStudent.quizResults.length
        : 0

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentUser?.name}! Ready to continue learning?</p>
          </div>

          {/* Stats Cards - Only Percentages */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">{Math.round(avgScore)}%</p>
                    <p className="text-gray-600">Average Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">
                      {currentStudent?.quizResults.length > 0
                        ? Math.round(
                            (currentStudent.quizResults.filter((q) => q.status === "completed").length /
                              scheduledQuizzes.filter((q) => q.status === "scheduled").length) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-gray-600">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">
                      {currentStudent?.quizResults.length > 0
                        ? Math.round(
                            (currentStudent.quizResults.filter((q) => q.score >= 80).length /
                              currentStudent.quizResults.length) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-gray-600">High Score Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentView("available-quizzes")}
            >
              <CardContent className="p-6 text-center">
                <Play className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Available Quizzes</h3>
                <p className="text-gray-600 mb-4">Take scheduled quizzes from your educators</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-2 h-4 w-4" />
                  View Quizzes
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentView("quiz-history")}
            >
              <CardContent className="p-6 text-center">
                <History className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quiz History</h3>
                <p className="text-gray-600 mb-4">Review your past quizzes and track progress</p>
                <Button variant="outline">
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentView("ai-assistant")}
            >
              <CardContent className="p-6 text-center">
                <Bot className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">ChatGPT Assistant</h3>
                <p className="text-gray-600 mb-4">Get help with your studies from AI tutor</p>
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Quiz Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStudent?.quizResults.length > 0 ? (
                  currentStudent.quizResults.slice(-3).map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium">{quiz.topic}</p>
                          <p className="text-sm text-gray-600">{quiz.date}</p>
                        </div>
                      </div>
                      <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
                        {quiz.score}%
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No quiz activity yet. Take your first quiz to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const AvailableQuizzes = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Quizzes</h1>
          <p className="text-gray-600">Take quizzes scheduled by your educators</p>
        </div>

        <div className="grid gap-6">
          {scheduledQuizzes
            .filter((quiz) => quiz.status === "scheduled")
            .map((quiz) => {
              const isCompleted = quiz.completedBy.includes(currentUser?.id)

              return (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                        <p className="text-gray-600 mb-2">Topic: {quiz.topic}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {quiz.scheduledDate}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {quiz.scheduledTime}
                          </div>
                          <div>Duration: {quiz.duration} mins</div>
                          <div>Questions: {quiz.questions}</div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          quiz.difficulty === "easy"
                            ? "secondary"
                            : quiz.difficulty === "medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      {isCompleted ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          Available
                        </Badge>
                      )}

                      {isCompleted ? (
                        <Button variant="outline" disabled>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Completed
                        </Button>
                      ) : (
                        <Button onClick={() => startQuiz(quiz)} className="bg-blue-600 hover:bg-blue-700">
                          <Play className="mr-2 h-4 w-4" />
                          Start Quiz
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </div>
    </div>
  )

  const AIAssistant = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ChatGPT AI Learning Assistant</h1>
          <p className="text-gray-600">Get personalized help with your studies powered by ChatGPT</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-6 w-6 text-purple-600" />
              Chat with AI Tutor (Powered by ChatGPT)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"
                    }`}
                  >
                    {msg.type === "bot" && <Bot className="h-4 w-4 inline mr-2 text-purple-600" />}
                    {msg.message}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border px-4 py-2 rounded-lg">
                    <Bot className="h-4 w-4 inline mr-2 text-purple-600" />
                    <Loader2 className="h-4 w-4 inline animate-spin mr-2" />
                    <span>AI is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Help me with math homework",
                  "Explain photosynthesis",
                  "World War II summary",
                  "Study tips for exams",
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatInput(suggestion)
                    }}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything about your studies... (Math, Science, History, etc.)"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isTyping && sendChatMessage()}
                className="flex-1"
              />
              <Button onClick={sendChatMessage} className="bg-purple-600 hover:bg-purple-700" disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const EducatorDashboard = () => {
    const totalQuizResults = students.reduce((total, student) => total + student.quizResults.length, 0)
    const avgClassScore =
      totalQuizResults > 0
        ? students.reduce((total, student) => {
            return (
              total +
              student.quizResults.reduce((sum, quiz) => sum + quiz.score, 0) / Math.max(student.quizResults.length, 1)
            )
          }, 0) / students.length
        : 0

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Educator Dashboard</h1>
            <p className="text-gray-600">Manage quizzes, students, and monitor learning outcomes</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">{scheduledQuizzes.length}</p>
                    <p className="text-gray-600">Total Quizzes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">{students.length}</p>
                    <p className="text-gray-600">Registered Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">{totalQuizResults}</p>
                    <p className="text-gray-600">Quiz Attempts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">{Math.round(avgClassScore)}%</p>
                    <p className="text-gray-600">Class Average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentView("quiz-section")}
            >
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quiz Section</h3>
                <p className="text-gray-600 mb-4">Manage all quiz activities</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Section
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentView("schedule-quiz")}
            >
              <CardContent className="p-6 text-center">
                <CalendarPlus className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Manage Quizzes</h3>
                <p className="text-gray-600 mb-4">Schedule and manage quizzes</p>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentView("student-details")}
            >
              <CardContent className="p-6 text-center">
                <UserCheck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Student Details</h3>
                <p className="text-gray-600 mb-4">View student information</p>
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  <UserCheck className="mr-2 h-4 w-4" />
                  View
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentView("google-classroom")}
            >
              <CardContent className="p-6 text-center">
                <ExternalLink className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Google Classroom</h3>
                <p className="text-gray-600 mb-4">Live classroom integration</p>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Student Analytics - Full Details for Educators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Student Performance Analytics
                </span>
                <Button variant="outline" size="sm" onClick={() => setCurrentView("student-details")}>
                  View All Details
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.slice(0, 3).map((student, index) => {
                  const avgScore =
                    student.quizResults.length > 0
                      ? student.quizResults.reduce((sum, quiz) => sum + quiz.score, 0) / student.quizResults.length
                      : 0

                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">
                            {student.quizResults.length} quizzes completed • Joined {student.joinDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={avgScore >= 80 ? "default" : avgScore >= 60 ? "secondary" : "destructive"}>
                          {Math.round(avgScore)}% avg
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-1" />
                          {student.email}
                        </div>
                        {avgScore >= 80 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : avgScore >= 60 ? (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const GenerateQuiz = () => {
    const [quizData, setQuizData] = useState({
      title: "",
      topic: "",
      difficulty: "medium",
      numQuestions: 5,
      description: "",
    })

    const [showSuccess, setShowSuccess] = useState(false)

    const handleGenerateQuiz = () => {
      const newQuiz = generateQuiz(quizData)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setCurrentView("schedule-quiz")
      }, 2000)
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate AI Quiz</h1>
            <p className="text-gray-600">Create personalized quizzes using AI technology</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-6 w-6" />
                Quiz Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Quiz Generated Successfully!</p>
                  <p className="text-green-600 text-sm">Redirecting to schedule quiz...</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Quiz Title</label>
                <Input
                  placeholder="e.g., Mathematics Quiz - Chapter 5"
                  value={quizData.title}
                  onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Input
                  placeholder="e.g., Algebra, Physics, History"
                  value={quizData.topic}
                  onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <Tabs
                  value={quizData.difficulty}
                  onValueChange={(value) => setQuizData({ ...quizData, difficulty: value })}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Questions</label>
                <Input
                  type="number"
                  min="3"
                  max="20"
                  value={quizData.numQuestions}
                  onChange={(e) => setQuizData({ ...quizData, numQuestions: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description (Optional)</label>
                <Textarea
                  placeholder="Brief description of the quiz content..."
                  value={quizData.description}
                  onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleGenerateQuiz}
                  disabled={!quizData.title.trim() || !quizData.topic.trim() || showSuccess}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Generate AI Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const ScheduleQuiz = () => {
    const [scheduleData, setScheduleData] = useState({
      quizId: "",
      date: "",
      time: "",
      duration: 30,
    })

    const [showSuccess, setShowSuccess] = useState(false)

    const handleScheduleQuiz = () => {
      if (scheduleData.quizId && scheduleData.date && scheduleData.time) {
        scheduleQuiz(scheduleData.quizId, scheduleData)
        setShowSuccess(true)
        setScheduleData({ quizId: "", date: "", time: "", duration: 30 })
        setTimeout(() => setShowSuccess(false), 3000)
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Quizzes</h1>
            <p className="text-gray-600">Schedule quizzes and manage existing ones</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Schedule Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarPlus className="mr-2 h-6 w-6" />
                  Schedule Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {showSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">Quiz Scheduled Successfully!</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Quiz</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={scheduleData.quizId}
                    onChange={(e) => setScheduleData({ ...scheduleData, quizId: e.target.value })}
                  >
                    <option value="">Choose a quiz...</option>
                    {scheduledQuizzes
                      .filter((q) => q.status === "draft")
                      .map((quiz) => (
                        <option key={quiz.id} value={quiz.id}>
                          {quiz.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={scheduleData.time}
                    onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input
                    type="number"
                    min="15"
                    max="180"
                    value={scheduleData.duration}
                    onChange={(e) => setScheduleData({ ...scheduleData, duration: Number.parseInt(e.target.value) })}
                  />
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleScheduleQuiz}
                  disabled={!scheduleData.quizId || !scheduleData.date || !scheduleData.time}
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule Quiz
                </Button>
              </CardContent>
            </Card>

            {/* All Quizzes List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <BookOpen className="mr-2 h-6 w-6" />
                    All Quizzes
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setCurrentView("generate-quiz")}>
                    <Plus className="h-4 w-4 mr-1" />
                    New Quiz
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {scheduledQuizzes.map((quiz) => (
                    <div key={quiz.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{quiz.title}</h4>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteQuiz(quiz.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Topic: {quiz.topic} • {quiz.questions} questions • {quiz.difficulty}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge
                          variant={
                            quiz.status === "scheduled" ? "default" : quiz.status === "draft" ? "secondary" : "outline"
                          }
                        >
                          {quiz.status}
                        </Badge>
                        {quiz.scheduledDate && (
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {quiz.scheduledDate}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {quiz.scheduledTime}
                            </div>
                          </div>
                        )}
                      </div>
                      {quiz.status === "scheduled" && (
                        <div className="mt-2 text-sm text-gray-600">
                          Completed by: {quiz.completedBy.length} students
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const StudentDetails = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Details & Login Information</h1>
          <p className="text-gray-600">Complete student registration and login details with performance analytics</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <GraduationCap className="mr-2 h-6 w-6" />
                Registered Students ({students.length})
              </span>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Student Info</th>
                    <th className="text-left p-4">Login Details</th>
                    <th className="text-left p-4">Contact Info</th>
                    <th className="text-left p-4">Registration</th>
                    <th className="text-left p-4">Performance</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const avgScore =
                      student.quizResults.length > 0
                        ? student.quizResults.reduce((sum, quiz) => sum + quiz.score, 0) / student.quizResults.length
                        : 0

                    return (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold">{student.name}</p>
                              <p className="text-sm text-gray-600">ID: {student.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <Mail className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="font-medium">{student.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Lock className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-gray-600">Password: {student.password}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <Phone className="h-4 w-4 mr-1 text-gray-400" />
                              {student.phone}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              {student.address}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                              {student.joinDate}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {student.userType}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
                              {student.quizResults.length} quizzes
                            </div>
                            <Badge variant={avgScore >= 80 ? "default" : avgScore >= 60 ? "secondary" : "destructive"}>
                              {Math.round(avgScore)}% avg
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary Statistics */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{students.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-green-600">
                  {students.filter((s) => s.quizResults.length > 0).length}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {Math.round(
                    students.reduce((total, student) => {
                      const avgScore =
                        student.quizResults.length > 0
                          ? student.quizResults.reduce((sum, quiz) => sum + quiz.score, 0) / student.quizResults.length
                          : 0
                      return total + avgScore
                    }, 0) / students.length,
                  )}
                  %
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">High Performers</p>
                <p className="text-2xl font-bold text-purple-600">
                  {
                    students.filter((student) => {
                      const avgScore =
                        student.quizResults.length > 0
                          ? student.quizResults.reduce((sum, quiz) => sum + quiz.score, 0) / student.quizResults.length
                          : 0
                      return avgScore >= 80
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const GoogleClassroom = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Google Classroom Integration</h1>
          <p className="text-gray-600">Live integration with Google Classroom for seamless course management</p>
        </div>

        {/* Integration Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <ExternalLink className="mr-2 h-6 w-6" />
                Live Integration Status
              </span>
              <Badge variant="default" className="bg-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Live & Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{googleClassrooms.length}</div>
                <div className="text-gray-600">Connected Classes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {googleClassrooms.reduce((total, classroom) => total + classroom.students, 0)}
                </div>
                <div className="text-gray-600">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {googleClassrooms.filter((c) => c.isLive).length}
                </div>
                <div className="text-gray-600">Live Classes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Real-time</div>
                <div className="text-gray-600">Sync Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classroom List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Users className="mr-2 h-6 w-6" />
                Google Classrooms
              </span>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Classroom
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {googleClassrooms.map((classroom) => (
                <div key={classroom.id} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1 flex items-center">
                        {classroom.name}
                        {classroom.isLive && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">LIVE</span>
                        )}
                      </h3>
                      <p className="text-gray-600 mb-2">{classroom.section}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {classroom.students} students
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Last sync: {classroom.lastSync}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={classroom.status === "active" ? "default" : "secondary"}
                      className={classroom.status === "syncing" ? "animate-pulse" : ""}
                    >
                      {classroom.status === "syncing" && <Sync className="h-4 w-4 mr-1 animate-spin" />}
                      {classroom.status}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => syncGoogleClassroom(classroom.id)}
                        disabled={classroom.status === "syncing"}
                      >
                        <Sync className={`h-4 w-4 mr-1 ${classroom.status === "syncing" ? "animate-spin" : ""}`} />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>

                    <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open in Google
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sync Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-6 w-6" />
              Live Sync Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Real-time Auto Sync</h4>
                  <p className="text-sm text-gray-600">Automatically sync classroom data in real-time</p>
                </div>
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Enabled
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Student Enrollment Sync</h4>
                  <p className="text-sm text-gray-600">Sync new student enrollments automatically</p>
                </div>
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Live
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Assignment Integration</h4>
                  <p className="text-sm text-gray-600">Create Google Classroom assignments from quizzes</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const TakeQuiz = () => {
    const question = currentQuiz?.questions[currentQuestion]

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Quiz: {currentQuiz?.topic}
                </CardTitle>
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {currentQuiz?.questions.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{question?.question}</h3>
                <div className="space-y-3">
                  {question?.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        quizAnswers[currentQuestion] === index
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        const newAnswers = [...quizAnswers]
                        newAnswers[currentQuestion] = index
                        setQuizAnswers(newAnswers)
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            quizAnswers[currentQuestion] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {quizAnswers[currentQuestion] === index && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>

                {currentQuestion === currentQuiz?.questions.length - 1 ? (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={submitQuiz}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={quizAnswers[currentQuestion] === null}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const QuizResults = () => {
    const score = Math.floor(Math.random() * 40) + 60 // Random score between 60-100

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-6 w-6" />
                Quiz Results
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{score}%</span>
                </div>
                <h3 className="text-xl font-semibold mt-4">Your Score</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.floor((score / 100) * currentQuiz?.questions.length)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold">{currentQuiz?.questions.length}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Performance</p>
                  <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>
                    {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={() => setCurrentView("available-quizzes")}>
                  <Play className="mr-2 h-4 w-4" />
                  Take Another Quiz
                </Button>
                <Button variant="outline" onClick={() => setCurrentView("quiz-history")}>
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const QuizHistory = () => {
    const currentStudent = students.find((s) => s.id === currentUser?.id)

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz History</h1>
              <p className="text-gray-600">Track your learning progress and review past quiz performance</p>
            </div>
            <Button onClick={() => setCurrentView("available-quizzes")}>
              <Play className="mr-2 h-4 w-4" />
              Take Quiz
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="mr-2 h-5 w-5" />
                Your Quiz History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStudent?.quizResults.length > 0 ? (
                  currentStudent.quizResults.map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <BookOpen className="h-6 w-6 text-blue-600 mr-4" />
                        <div>
                          <p className="font-semibold">{quiz.topic}</p>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {quiz.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
                          {quiz.score}%
                        </Badge>
                        <div className="flex items-center">
                          {quiz.score >= 80 ? (
                            <Star className="h-4 w-4 text-yellow-500" />
                          ) : quiz.score >= 60 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No quiz history yet. Take your first quiz to get started!</p>
                  </div>
                )}
              </div>

              {/* Performance Summary - Only Percentages for Students */}
              {currentStudent?.quizResults.length > 0 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-blue-600">100%</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round(
                        currentStudent.quizResults.reduce((sum, quiz) => sum + quiz.score, 0) /
                          currentStudent.quizResults.length,
                      )}
                      %
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">High Score Rate</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {Math.round(
                        (currentStudent.quizResults.filter((q) => q.score >= 80).length /
                          currentStudent.quizResults.length) *
                          100,
                      )}
                      %
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Best Score</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.max(...currentStudent.quizResults.map((q) => q.score))}%
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const QuizSection = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Section</h1>
          <p className="text-gray-600">Comprehensive quiz management and analytics dashboard</p>
        </div>

        {/* Quiz Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold">{scheduledQuizzes.length}</p>
                  <p className="text-gray-600">Total Quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    {scheduledQuizzes.filter((q) => q.status === "scheduled").length}
                  </p>
                  <p className="text-gray-600">Active Quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold">{scheduledQuizzes.filter((q) => q.status === "draft").length}</p>
                  <p className="text-gray-600">Draft Quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    {scheduledQuizzes.reduce((total, quiz) => total + quiz.completedBy.length, 0)}
                  </p>
                  <p className="text-gray-600">Total Attempts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentView("generate-quiz")}
          >
            <CardContent className="p-6 text-center">
              <Plus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create New Quiz</h3>
              <p className="text-gray-600 mb-4">Generate AI-powered quizzes</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Quiz
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentView("schedule-quiz")}
          >
            <CardContent className="p-6 text-center">
              <CalendarPlus className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Schedule & Manage</h3>
              <p className="text-gray-600 mb-4">Schedule and manage existing quizzes</p>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Manage Quizzes
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quiz Analytics</h3>
              <p className="text-gray-600 mb-4">View detailed quiz performance</p>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quiz Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Quizzes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Active Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledQuizzes
                  .filter((quiz) => quiz.status === "scheduled")
                  .slice(0, 3)
                  .map((quiz) => (
                    <div key={quiz.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{quiz.title}</h4>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {quiz.topic} • {quiz.questions} questions
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-4 text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {quiz.scheduledDate}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {quiz.scheduledTime}
                          </div>
                        </div>
                        <div className="text-blue-600 font-medium">{quiz.completedBy.length} completed</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Quiz Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledQuizzes
                  .filter((quiz) => quiz.completedBy.length > 0)
                  .slice(0, 3)
                  .map((quiz) => {
                    const completionRate = Math.round((quiz.completedBy.length / students.length) * 100)
                    const avgScore =
                      students
                        .filter((student) => quiz.completedBy.includes(student.id))
                        .reduce((total, student) => {
                          const quizResult = student.quizResults.find((result) => result.quizId === quiz.id)
                          return total + (quizResult ? quizResult.score : 0)
                        }, 0) / quiz.completedBy.length

                    return (
                      <div key={quiz.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{quiz.title}</h4>
                          <Badge variant={avgScore >= 80 ? "default" : avgScore >= 60 ? "secondary" : "destructive"}>
                            {Math.round(avgScore)}% avg
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Completion Rate</p>
                            <p className="font-medium">{completionRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Students Completed</p>
                            <p className="font-medium">
                              {quiz.completedBy.length}/{students.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage />
      case "login":
        return <LoginPage />
      case "register":
        return <RegisterPage />
      case "student-dashboard":
        return <StudentDashboard />
      case "educator-dashboard":
        return <EducatorDashboard />
      case "available-quizzes":
        return <AvailableQuizzes />
      case "ai-assistant":
        return <AIAssistant />
      case "generate-quiz":
        return <GenerateQuiz />
      case "schedule-quiz":
        return <ScheduleQuiz />
      case "student-details":
        return <StudentDetails />
      case "google-classroom":
        return <GoogleClassroom />
      case "take-quiz":
        return <TakeQuiz />
      case "quiz-results":
        return <QuizResults />
      case "quiz-history":
        return <QuizHistory />
      case "quiz-section":
        return <QuizSection />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {renderCurrentView()}
    </div>
  )
}
