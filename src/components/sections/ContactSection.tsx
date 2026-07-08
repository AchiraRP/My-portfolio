import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Mail, Github, Linkedin, Terminal, Send, MapPin, Download } from 'lucide-react';
import { submitContactForm } from '../../api/contact';

const contactLinks = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'email.sh',
    value: import.meta.env.VITE_CONTACT_EMAIL || 'YOUR_EMAIL',
    href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'YOUR_EMAIL'}`
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: 'github.com',
    value: import.meta.env.VITE_GITHUB_USERNAME || 'YOUR_GITHUB',
    href: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'YOUR_GITHUB'}`
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: 'linkedin.com',
    value: import.meta.env.VITE_LINKEDIN_USERNAME || 'YOUR_LINKEDIN',
    href: `https://linkedin.com/in/${import.meta.env.VITE_LINKEDIN_USERNAME || 'YOUR_LINKEDIN'}`
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'location.geo',
    value: 'Sri Lanka',
    href: '#'
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> system_status: online',
    '> contact_form: initialized',
    '> waiting_for_input...'
  ]);

  const sanitizeInput = (input: string) => {
    // Strip non-printable ASCII control characters
    return input.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  };

  const handleInputChange = (field: string, value: string) => {
    const cleanValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: cleanValue }));

    // Add terminal-style feedback
    setTerminalOutput(prev => {
      const newOutput = [...prev, `> ${field}_updated: "${cleanValue.substring(0, 20)}${cleanValue.length > 20 ? '...' : ''}"`];
      if (newOutput.length > 10) newOutput.shift(); // Keep only last 10 lines
      return newOutput;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTerminalOutput(prev => [
      ...prev,
      '> processing_message...',
      '> establishing_secure_connection...',
    ]);

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      
      if (result.success) {
        setTerminalOutput(prev => [
          ...prev,
          '> connection_established: 200 OK',
          '> payload_delivered: success',
          '> thank_you_for_reaching_out!'
        ]);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setTerminalOutput(prev => [
          ...prev,
          '> error: delivery_failed',
          `> system_response: ${result.message}`
        ]);
      }
    } catch (error) {
      setTerminalOutput(prev => [
        ...prev,
        '> error: network_failure',
        '> check_connection_and_retry'
      ]);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block cyber-border bg-black-light/50 rounded px-6 py-3 mb-4">
            <h2 className="font-mono text-primary">CONTACT.INTERFACE</h2>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
            Interested in cybersecurity, technology, artificial intelligence, or collaboration opportunities?
            
            Let's establish a secure connection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="cyber-border bg-black-light/30 border-primary/20 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Terminal className="w-5 h-5 text-primary" />
              <h3 className="font-mono text-primary">message.send()</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-sm text-primary mb-2">
                  --name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="font-mono bg-black-light border-primary/30 focus:border-primary text-primary"
                  placeholder="Enter your name..."
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-sm text-primary mb-2">
                  --email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="font-mono bg-black-light border-primary/30 focus:border-primary text-primary"
                  placeholder="your.email@domain.com"
                  maxLength={200}
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-sm text-primary mb-2">
                  --message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="font-mono bg-black-light border-primary/30 focus:border-primary text-primary min-h-[120px]"
                  placeholder="Hello! I'd like to discuss..."
                  maxLength={1000}
                  required
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                  className="shimmer-btn flex-1 border-primary text-primary hover:bg-primary/10 font-mono"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Get Resume
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></div>
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Execute Send
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>

          {/* Terminal Output & Contact Info */}
          <div className="space-y-6">
            {/* Terminal Output */}
            <Card className="cyber-border bg-black-light/30 border-primary/20 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="ml-2 font-mono text-sm text-muted-foreground">terminal.log</span>
              </div>

              <div className="font-mono text-sm space-y-1 max-h-48 overflow-y-auto">
                {terminalOutput.map((line, index) => (
                  <div key={index} className="text-green-dark">
                    {line}
                  </div>
                ))}
                <div className="text-primary">
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </Card>

            {/* Contact Links */}
            <Card className="cyber-border bg-black-light/30 border-primary/20 p-6">
              <h3 className="font-mono text-primary mb-4">connection.links</h3>
              <div className="space-y-3">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center space-x-3 p-3 rounded hover:bg-primary/10 transition-colors duration-200 group"
                  >
                    <div className="text-primary group-hover:text-primary">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm text-primary">{link.label}</div>
                      <div className="font-mono text-xs text-muted-foreground">{link.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}