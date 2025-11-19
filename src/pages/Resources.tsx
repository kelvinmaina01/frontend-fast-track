import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Code2, Palette, GitBranch, Wrench } from "lucide-react";

const Resources = () => {
  const resourceCategories = [
    {
      title: "HTML Resources",
      icon: Code2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      resources: [
        { name: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
        { name: "MDN HTML Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "HTML.com", url: "https://html.com/" },
        { name: "HTML Reference", url: "https://htmlreference.io/" },
      ],
    },
    {
      title: "CSS Resources",
      icon: Palette,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      resources: [
        { name: "W3Schools CSS Tutorial", url: "https://www.w3schools.com/css/" },
        { name: "MDN CSS Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "CSS-Tricks", url: "https://css-tricks.com/" },
        { name: "CSS Reference", url: "https://cssreference.io/" },
        { name: "Flexbox Froggy (Game)", url: "https://flexboxfroggy.com/" },
        { name: "Grid Garden (Game)", url: "https://cssgridgarden.com/" },
      ],
    },
    {
      title: "JavaScript Resources",
      icon: Code2,
      color: "text-accent",
      bgColor: "bg-accent/10",
      resources: [
        { name: "W3Schools JavaScript Tutorial", url: "https://www.w3schools.com/js/" },
        { name: "MDN JavaScript Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "JavaScript.info", url: "https://javascript.info/" },
        { name: "Eloquent JavaScript (Book)", url: "https://eloquentjavascript.net/" },
      ],
    },
    {
      title: "Git & GitHub",
      icon: GitBranch,
      color: "text-primary",
      bgColor: "bg-primary/10",
      resources: [
        { name: "GitHub Docs", url: "https://docs.github.com" },
        { name: "W3Schools Git Tutorial", url: "https://www.w3schools.com/git/" },
        { name: "Git Handbook", url: "https://guides.github.com/introduction/git-handbook/" },
        { name: "Learn Git Branching", url: "https://learngitbranching.js.org/" },
      ],
    },
    {
      title: "Developer Tools",
      icon: Wrench,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      resources: [
        { name: "Visual Studio Code", url: "https://code.visualstudio.com/" },
        { name: "CodePen (Online Editor)", url: "https://codepen.io/" },
        { name: "Can I Use (Browser Support)", url: "https://caniuse.com/" },
        { name: "Chrome DevTools Docs", url: "https://developer.chrome.com/docs/devtools/" },
      ],
    },
    {
      title: "General Learning",
      icon: Code2,
      color: "text-accent",
      bgColor: "bg-accent/10",
      resources: [
        { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
        { name: "The Odin Project", url: "https://www.theodinproject.com/" },
        { name: "Codecademy", url: "https://www.codecademy.com/" },
        { name: "Frontend Mentor (Projects)", url: "https://www.frontendmentor.io/" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated collection of the best resources to support your learning journey
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.resources.map((resource, idx) => (
                        <li key={idx}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline group"
                          >
                            <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span>{resource.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Tips */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>Tips for Using These Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>✓ Don't try to learn everything at once — focus on one topic at a time</p>
              <p>✓ Practice coding every day, even if it's just for 15 minutes</p>
              <p>✓ Build projects to apply what you've learned</p>
              <p>✓ Use multiple resources to get different perspectives on the same topic</p>
              <p>✓ Join developer communities to ask questions and share your progress</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
