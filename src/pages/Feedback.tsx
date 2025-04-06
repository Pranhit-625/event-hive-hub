
import Layout from '../components/Layout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    
    toast.success('Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Feedback</h1>
        <div className="bg-white p-8 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-lg font-medium mb-2">
                Share your thoughts about our events and activities:
              </label>
              <Textarea
                id="feedback"
                placeholder="Type your feedback here..."
                className="min-h-[200px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Submit Feedback</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
