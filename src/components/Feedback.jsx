import React from 'react';
import { Send } from 'lucide-react';

const Feedback = () => {
  return (
    <div id="feedback" className="w-full bg-[#080d17] py-20 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-4xl mx-auto px-5 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-sm tracking-[0.2em] font-bold text-gray-400 mb-3 uppercase">We value your input</h2>
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Get In 
            {/* <span className="text-[#FF5800]">Touch</span> */}

            <span className=''>
                <span className="text-yellow-400"> T</span>
                <span className="text-red-500">O</span>
                <span className="text-blue-500">U</span>
                <span className="text-green-500">C</span>
                <span className="text-orange-500">H </span>
            </span>
            
          </h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-lg">
            Have questions, feature requests, or just want to share your latest solve time? Drop us a message below.
          </p>
        </div>

        <form className="w-full max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="John Doe" 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="john@example.com" 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Subject</label>
            <input 
              type="text" 
              id="subject" 
              placeholder="How can we help?" 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Message</label>
            <textarea 
              id="message" 
              rows="5" 
              placeholder="Write your message here..." 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all resize-none"
            ></textarea>
          </div>

          <button 
            type="button" 
            className="mt-2 w-full bg-[#FF5800] hover:bg-[#e64f00] text-black font-bold uppercase tracking-widest py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Send Message <Send className="w-5 h-5" />
          </button>
        </form>
      </main>

      {/* Simple Footer built-in at the bottom per original Hero code commentary */}
      <footer className='w-full text-center py-6 px-10 mt-20 relative z-10'>
        <div className="border-t border-white/10 max-w-7xl mx-auto mb-6"></div>
        <p className="text-gray-500 text-sm font-medium">All Rights Reserved | Developed in 2026</p>
      </footer>
    </div>
  );
};

export default Feedback;
