"use client";
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'landing_page_simplified'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ type: 'error', text: 'Failed to connect to server. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <p className="mb-4 text-lg text-gray-400">Join 500+ aspiring chatbot entrepreneurs</p>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Enter your email to secure your spot"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-green-500"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      {message.text && (
        <div className={`mt-4 p-3 rounded-md text-center ${message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
