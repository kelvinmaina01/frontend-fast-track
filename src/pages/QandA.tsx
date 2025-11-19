import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send, Reply } from "lucide-react";
import { toast } from "sonner";

interface Reply {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

interface Question {
  id: string;
  name: string;
  question: string;
  timestamp: string;
  replies: Reply[];
}

const QandA = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formData, setFormData] = useState({ name: "", question: "" });
  const [replyForms, setReplyForms] = useState<{ [key: string]: { name: string; text: string } }>({});

  useEffect(() => {
    const saved = localStorage.getItem("questions");
    if (saved) {
      setQuestions(JSON.parse(saved));
    }
  }, []);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      name: formData.name || "Anonymous",
      question: formData.question,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    const updated = [newQuestion, ...questions];
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));

    toast.success("Question posted successfully!");
    setFormData({ name: "", question: "" });
  };

  const handleSubmitReply = (questionId: string) => {
    const replyData = replyForms[questionId];
    
    if (!replyData?.text.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    const newReply: Reply = {
      id: Date.now().toString(),
      name: replyData.name || "Anonymous",
      text: replyData.text,
      timestamp: new Date().toISOString(),
    };

    const updated = questions.map((q) =>
      q.id === questionId
        ? { ...q, replies: [...q.replies, newReply] }
        : q
    );

    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));

    toast.success("Reply posted!");
    setReplyForms({ ...replyForms, [questionId]: { name: "", text: "" } });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <MessageSquare className="h-10 w-10 text-primary" />
              Community Q&A
            </h1>
            <p className="text-lg text-muted-foreground">
              Ask questions, share knowledge, and help fellow learners
            </p>
          </div>

          {/* Ask Question Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div>
                  <Label htmlFor="ask-name">Your Name (Optional)</Label>
                  <Input
                    id="ask-name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="ask-question">
                    Your Question <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="ask-question"
                    placeholder="What would you like to know?"
                    rows={4}
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Post Question
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Questions List */}
          <div className="space-y-6">
            {questions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No questions yet. Be the first to ask!
                  </p>
                </CardContent>
              </Card>
            ) : (
              questions.map((question) => (
                <Card key={question.id}>
                  <CardHeader>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-primary">{question.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(question.timestamp)}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg">{question.question}</p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Replies */}
                    {question.replies.length > 0 && (
                      <div className="space-y-4 mb-4 pl-4 border-l-2 border-muted">
                        {question.replies.map((reply) => (
                          <div key={reply.id} className="bg-muted/30 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Reply className="h-4 w-4 text-secondary" />
                              <p className="font-semibold text-sm">{reply.name}</p>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm ml-6">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    <div className="space-y-3 bg-secondary/5 p-4 rounded-lg">
                      <Label>Add a Reply</Label>
                      <Input
                        placeholder="Your name (optional)"
                        value={replyForms[question.id]?.name || ""}
                        onChange={(e) =>
                          setReplyForms({
                            ...replyForms,
                            [question.id]: {
                              ...replyForms[question.id],
                              name: e.target.value,
                            },
                          })
                        }
                      />
                      <Textarea
                        placeholder="Write your reply..."
                        rows={2}
                        value={replyForms[question.id]?.text || ""}
                        onChange={(e) =>
                          setReplyForms({
                            ...replyForms,
                            [question.id]: {
                              ...replyForms[question.id],
                              text: e.target.value,
                            },
                          })
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReply(question.id)}
                      >
                        <Reply className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA;
