import React from 'react';

export const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-800 dark:text-slate-200">
    <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
    <p className="text-xs text-slate-500">Ministry of Health Sri Lanka Public Health Portal</p>
    
    <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
      <p>This privacy policy outlines how the Ministry of Health Sri Lanka collects, uses, and safeguards citizen medical records, appointment bookings, and environmental complaint data.</p>
      <h3 className="font-bold text-base">1. Information Collection</h3>
      <p>We collect National Identity Card (NIC) numbers, contact details, appointment selections, and PHI complaint reports strictly for public health administration and disease surveillance.</p>
      <h3 className="font-bold text-base">2. Data Security</h3>
      <p>All digital health records and QR tokens are encrypted using government security protocols to prevent unauthorized access.</p>
    </div>
  </div>
);
