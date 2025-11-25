"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

const PANEL_CONTENT = {
  about: {
    title: "About Research Commons",
    html: `
      <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
          <p class="text-lg font-medium">Our mission is to create a transparent, verifiable ecosystem for academic credentials and research achievements.</p>
          
          <div>
            <h4 class="font-semibold mb-2">What We Offer:</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>AI-powered verification of academic credentials</li>
              <li>Blockchain-based credential verification</li>
              <li>Institutional endorsement system</li>
              <li>Comprehensive research tools and analytics</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-2">Who Benefits:</h4>
            <div class="grid grid-cols-2 gap-2">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>
                <span>Students</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>
                <span>Teachers</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>
                <span>Researchers</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
                <span>Recruiters</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-amber-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-3 text-amber-800">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="#how-it-works" class="text-amber-700 hover:underline flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              How it works
            </a></li>
            <li><a href="#partners" class="text-amber-700 hover:underline flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              Institution partners
            </a></li>
            <li><a href="#careers" class="text-amber-700 hover:underline flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Careers
            </a></li>
          </ul>
          <a href="/about" class="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-sm font-medium">
            Learn more about us →
          </a>
        </div>
      </div>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    html: `
      <div class="space-y-6">
        <div class="bg-white p-4 rounded-lg border border-amber-100">
          <p class="mb-4">We are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and protect your data.</p>
          
          <div class="mb-4">
            <h4 class="font-semibold mb-2">Key Points:</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>We collect only necessary information to provide our services</li>
              <li>Your data is encrypted and stored securely</li>
              <li>You control your privacy settings and data visibility</li>
              <li>We never sell your personal information</li>
            </ul>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h5 class="font-medium mb-1">Data We Collect:</h5>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Account information (name, email, affiliation)</li>
                <li>• Academic credentials for verification</li>
                <li>• Usage data and analytics</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium mb-1">Your Controls:</h5>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Toggle profile visibility</li>
                <li>• Manage connected accounts</li>
                <li>• Download your data</li>
                <li>• Request data deletion</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-amber-50 p-3 rounded text-sm">
            <h5 class="font-medium text-amber-800 mb-1 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
              Blockchain & Data Security
            </h5>
            <p class="text-amber-700">Note: Our blockchain registry only stores cryptographic hashes and digital signatures of credentials. Your personal data is never stored on-chain. This ensures both verification and privacy.</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold mb-2">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="/privacy/data-retention" class="text-amber-700 hover:underline">Data retention policy</a></li>
              <li><a href="/privacy/cookies" class="text-amber-700 hover:underline">Cookie policy</a></li>
              <li><a href="/privacy/third-party" class="text-amber-700 hover:underline">Third-party services</a></li>
              <li><a href="mailto:privacy@researchcommons.ai" class="text-amber-700 hover:underline">Contact privacy officer</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-2">Frequently Asked</h4>
            <div class="space-y-2">
              <details class="group">
                <summary class="flex justify-between items-center cursor-pointer text-amber-700">
                  <span>How is my data protected?</span>
                  <svg class="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <p class="mt-1 text-sm text-gray-600">We use industry-standard encryption both in transit (TLS 1.2+) and at rest (AES-256). Regular security audits and access controls are in place.</p>
              </details>
              
              <details class="group">
                <summary class="flex justify-between items-center cursor-pointer text-amber-700">
                  <span>Can I delete my account?</span>
                  <svg class="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <p class="mt-1 text-sm text-gray-600">Yes, you can delete your account at any time from your profile settings. This will remove your personal data from our systems, with certain exceptions for legal or operational requirements.</p>
              </details>
              
              <details class="group">
                <summary class="flex justify-between items-center cursor-pointer text-amber-700">
                  <span>How do you use cookies?</span>
                  <svg class="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <p class="mt-1 text-sm text-gray-600">We use essential cookies for site functionality and analytics cookies to improve our services. You can manage cookie preferences in your browser or account settings.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  terms: {
    title: "Terms of Service",
    html: `
      <div class="space-y-6">
        <div class="bg-white p-4 rounded-lg border border-amber-100">
          <p class="text-sm text-gray-500 mb-4">Effective: November 25, 2025</p>
          
          <div class="mb-6">
            <p class="mb-4">Welcome to Research Commons. By accessing or using our platform, you agree to these Terms of Service. Please read them carefully.</p>
            
            <h4 class="font-semibold mb-2">Key Terms:</h4>
            <ul class="list-disc pl-5 space-y-1 mb-4">
              <li>You must be at least 16 years old to use our services</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>Content you submit must comply with our community guidelines</li>
              <li>We may update these terms with notice</li>
            </ul>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h5 class="font-medium mb-2">User Responsibilities</h5>
                <ul class="text-sm space-y-1">
                  <li>• Provide accurate account information</li>
                  <li>• Keep login credentials secure</li>
                  <li>• Respect intellectual property rights</li>
                  <li>• Comply with all applicable laws</li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-medium mb-2">Content Ownership</h5>
                <p class="text-sm">You retain ownership of any intellectual property rights that you hold in the content you submit. By posting content, you grant us a worldwide license to use, host, and display your content.</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <details class="group border rounded-lg p-3">
              <summary class="flex justify-between items-center cursor-pointer font-medium">
                <span>Dispute Resolution</span>
                <svg class="w-5 h-5 text-amber-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <div class="mt-2 text-sm text-gray-600 space-y-2">
                <p>In the event of any dispute, claim, or controversy arising out of or relating to these Terms, the parties shall first attempt to resolve the dispute through good faith negotiations.</p>
                <p>If the dispute cannot be resolved through negotiation, the dispute shall be resolved through binding arbitration rather than in courts of general jurisdiction.</p>
              </div>
            </details>
            
            <details class="group border rounded-lg p-3">
              <summary class="flex justify-between items-center cursor-pointer font-medium">
                <span>Governing Law</span>
                <svg class="w-5 h-5 text-amber-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <div class="mt-2 text-sm text-gray-600">
                <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Research Commons is established, without regard to its conflict of law provisions.</p>
              </div>
            </details>
          </div>
          
          <div class="mt-6 pt-4 border-t">
            <a href="/terms/full" class="inline-flex items-center text-amber-700 hover:underline font-medium">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              Download Full Terms (PDF)
            </a>
          </div>
        </div>
      </div>
    `,
  },
  contact: {
    title: "Contact Us",
    html: `
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-medium mb-4">Send us a message</h3>
          <form id="contact-form" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" name="name" required 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Your name">
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="your.email@example.com">
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select id="subject" name="subject" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>Press/Media</option>
                <option>Report an Issue</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" rows="4" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="How can we help you?"></textarea>
            </div>
            
            <div class="flex items-center justify-between pt-2">
              <button type="submit" class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors">
                Send Message
              </button>
              
              <button type="button" class="px-4 py-2 border border-amber-600 text-amber-700 rounded-md hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/></svg>
                  Start Live Chat
                </span>
              </button>
            </div>
          </form>
          
          <div id="form-success" class="hidden mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
            Your message has been sent. We'll get back to you soon!
          </div>
        </div>
        
        <div class="border-l border-gray-200 pl-8">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-3">Contact Information</h3>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                  </div>
                  <div class="ml-3 text-sm">
                    <p class="font-medium text-gray-900">Research Commons HQ</p>
                    <p class="text-gray-500">123 Academia Street<br>Kolkata, West Bengal 700001<br>India</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                  </div>
                  <div class="ml-3 text-sm">
                    <p class="font-medium text-gray-900">Email us at</p>
                    <div class="mt-1 space-y-1">
                      <p class="text-amber-700 hover:underline"><a href="mailto:support@researchcommons.ai">support@researchcommons.ai</a></p>
                      <p class="text-amber-700 hover:underline"><a href="mailto:partnerships@researchcommons.ai">partnerships@researchcommons.ai</a></p>
                      <p class="text-amber-700 hover:underline"><a href="mailto:press@researchcommons.ai">press@researchcommons.ai</a></p>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  </div>
                  <div class="ml-3 text-sm">
                    <p class="font-medium text-gray-900">Call us</p>
                    <p class="text-amber-700">+91 98765 43210</p>
                    <p class="text-xs text-gray-500 mt-1">Monday to Friday, 9:00 AM to 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
              <div class="space-y-2">
                <a href="/report/privacy" class="flex items-center text-sm text-red-600 hover:underline">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  Report a Privacy Issue
                </a>
                <a href="/report/abuse" class="flex items-center text-sm text-red-600 hover:underline">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  Report Content or Abuse
                </a>
                <a href="/status" class="flex items-center text-sm text-amber-700 hover:underline">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  System Status
                </a>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Follow Us</h4>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-amber-600">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-amber-600">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-amber-600">
                  <span class="sr-only">GitHub</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        /* Animation for the contact form */
        @media (prefers-reduced-motion: no-preference) {
          #contact-form {
            animation: fadeInUp 0.4s ease-out forwards;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      </style>
    `,
  },
}

interface FooterWithPanelsProps {
  onSendMessage?: (payload: {
    name: string
    email: string
    subject: string
    message: string
  }) => Promise<{ ok: boolean; message?: string }>
}

export function FooterWithPanels({ onSendMessage }: FooterWithPanelsProps) {
  const [open, setOpen] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactSubject, setContactSubject] = useState("General")
  const [contactMessage, setContactMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ ok: boolean; message: string } | null>(null)

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 640)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(null)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setTimeout(() => closeBtnRef.current?.focus(), 80)
    } else {
      triggerRef.current?.focus()
    }
  }, [open])

  function openPanel(key: string, evt: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = evt.currentTarget
    setOpen((prev) => (prev === key ? null : key))
    setSendResult(null)
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!contactName || !contactEmail || !contactMessage) {
      setSendResult({ ok: false, message: "Please complete name, email and message." })
      return
    }
    setSending(true)
    try {
      const payload = { name: contactName, email: contactEmail, subject: contactSubject, message: contactMessage }
      const res = (await onSendMessage?.(payload)) ?? { ok: true }
      setSendResult(
        res.ok
          ? { ok: true, message: "Message sent — we'll reply soon." }
          : { ok: false, message: res.message || "Failed to send." },
      )
      if (res.ok) {
        setContactName("")
        setContactEmail("")
        setContactMessage("")
        setContactSubject("General")
      }
    } catch (err) {
      setSendResult({ ok: false, message: err instanceof Error ? err.message : "Error sending message." })
    } finally {
      setSending(false)
    }
  }

  const Panel = ({ keyName }: { keyName: string }) => {
    const content = PANEL_CONTENT[keyName as keyof typeof PANEL_CONTENT]
    if (!content) return null
    
    // Handle form submission for contact form
    useEffect(() => {
      if (keyName === 'contact') {
        const form = document.getElementById('contact-form')
        if (form) {
          const handleSubmit = (e: Event) => {
            e.preventDefault()
            const formData = new FormData(form as HTMLFormElement)
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', Object.fromEntries(formData))
            
            // Show success message
            const successDiv = document.getElementById('form-success')
            if (successDiv) {
              successDiv.classList.remove('hidden')
              // Reset form
              form.reset()
              // Hide success message after 5 seconds
              setTimeout(() => {
                successDiv.classList.add('hidden')
              }, 5000)
            }
          }
          
          form.addEventListener('submit', handleSubmit)
          return () => {
            form.removeEventListener('submit', handleSubmit)
          }
        }
      }
    }, [keyName])
    
    // Handle accordion functionality
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Add any client-side interactivity here
        // For example, you can add click handlers for the accordion toggles
        const details = document.querySelectorAll('details')
        details.forEach(detail => {
          detail.addEventListener('toggle', () => {
            // Optional: Add smooth animation for accordion
            if (detail.open) {
              const content = detail.querySelector('div')
              if (content) {
                content.style.overflow = 'hidden'
                content.style.maxHeight = '0'
                content.style.transition = 'max-height 0.3s ease-in-out'
                requestAnimationFrame(() => {
                  content.style.maxHeight = `${content.scrollHeight}px`
                  // Remove inline styles after animation completes
                  setTimeout(() => {
                    content.style.maxHeight = ''
                    content.style.overflow = ''
                    content.style.transition = ''
                  }, 300)
                })
              }
            }
          })
        })
      }
    }, [keyName])
    
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        className={`w-full ${isMobile ? 'h-full' : 'max-h-[70vh]'} bg-[#FFFDFC] rounded-t-xl md:rounded-lg shadow-lg overflow-auto`}
        style={{
          border: '1px solid rgba(59,59,59,0.06)',
          // Add smooth scrolling for better mobile experience
          WebkitOverflowScrolling: 'touch',
          // Add momentum scrolling for iOS
          overflowScrolling: 'touch',
          // Hide scrollbar for cleaner look (optional)
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {/* Hide scrollbar for WebKit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
        
        <div 
          className="sticky top-0 z-10 bg-white flex items-start justify-between p-4 border-b" 
          style={{ 
            borderColor: 'rgba(59,59,59,0.1)',
            // Add backdrop blur for iOS devices
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <h3 className="font-serif text-xl font-medium" style={{ color: '#7B5A3C' }}>
            {content.title}
          </h3>
          <div className="ml-4 flex items-center gap-2">
            {keyName === "contact" && (
              <a 
                href="mailto:support@researchcommons.ai" 
                className="text-sm font-medium text-amber-700 hover:underline hidden md:inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Email support
              </a>
            )}
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(null)}
              aria-label="Close panel"
              className="p-2 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-colors"
              style={{
                // Add touch target size for mobile
                minWidth: '2.5rem',
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#7B5A3C">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 text-[#3B3B3C] leading-relaxed">
          <div 
            className="prose prose-amber max-w-none"
            dangerouslySetInnerHTML={{ __html: content.html }} 
          />

          {keyName === "contact" && (
            <form onSubmit={handleSend} className="mt-4 space-y-3">
              <input
                className="w-full px-3 py-2 rounded border"
                placeholder="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <input
                className="w-full px-3 py-2 rounded border"
                placeholder="Your email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <select
                className="w-full px-3 py-2 rounded border"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
              >
                <option>General</option>
                <option>Partnership</option>
                <option>Bug report</option>
                <option>Institution integration</option>
              </select>
              <textarea
                className="w-full px-3 py-2 rounded border"
                rows={4}
                placeholder="Message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <div className="flex gap-3 items-center">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg"
                  style={{ background: "#C58B2C", color: "#fff" }}
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactName("")
                    setContactEmail("")
                    setContactMessage("")
                    setSendResult(null)
                  }}
                  className="px-3 py-2 rounded-lg border"
                >
                  Reset
                </button>
                {sendResult && (
                  <div className={`ml-3 text-sm ${sendResult.ok ? "text-green-700" : "text-red-700"}`}>
                    {sendResult.message}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:bg-black/10"
          onClick={() => setOpen(null)}
          aria-hidden="true"
        />
      )}

      <div className={`fixed left-0 right-0 bottom-0 z-40 flex justify-center pointer-events-none`}>
        <div
          className={`w-full md:max-w-5xl px-4 pb-4 pointer-events-auto transition-all duration-220 ease-out`}
          style={{
            transform: open ? "translateY(0%)" : "translateY(110%)",
          }}
          aria-hidden={!open}
        >
          {open && (
            <div className={`${isMobile ? "h-screen" : ""}`}>
              <Panel keyName={open} />
            </div>
          )}
        </div>
      </div>

      <footer className="bg-[#F7EFE0] border-t" style={{ borderColor: "rgba(59,59,59,0.04)" }}>
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="font-serif text-lg" style={{ color: "#3B3B3B" }}>
              Research Commons
            </div>
            <div className="text-sm text-[#7B5A3C] hidden md:block">AI-verified learning & academic registry</div>
          </div>

          <nav className="flex items-center gap-3 text-sm" aria-label="Footer navigation">
            <button
              onClick={(e) => openPanel("about", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              About
            </button>
            <button
              onClick={(e) => openPanel("privacy", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              Privacy
            </button>
            <button
              onClick={(e) => openPanel("terms", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              Terms
            </button>
            <button
              onClick={(e) => openPanel("contact", e)}
              className="px-2 py-1 rounded hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-xs text-[#7B5A3C]">© {new Date().getFullYear()} Research Commons</div>
            <div className="flex items-center gap-2">
              <a className="p-2 rounded hover:bg-amber-50" href="#" aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#7B5A3C">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3s-4 7-8 7c-1.94 0-3.36-1-4.24-2.3A12.94 12.94 0 012 4s3 9 11 12c0 0 4 1 6-1 0 0 4-2 6-7a4.48 4.48 0 00-.23-1.7A7.72 7.72 0 0023 3z"
                  />
                </svg>
              </a>
              <a className="p-2 rounded hover:bg-amber-50" href="#" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#7B5A3C">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2h-1v9h-4V8h4v1a4 4 0 018 0V8zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
