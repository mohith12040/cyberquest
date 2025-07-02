const sampleChallenges = [
  {
    id: 1,
    title: 'Spot the Phish',
    description: 'Identify phishing indicators in real email screenshots.',
    xp: 50,
    topic: 'Phishing',
    tutorial: `
### What is Phishing?
Phishing is a form of online scam where attackers impersonate legitimate institutions to trick individuals into revealing sensitive information like passwords, credit card numbers, or Social Security numbers.

### How Phishing Works:
Phishing attacks often come in the form of deceptive emails, messages, or websites that appear to come from trusted sources. These messages usually include a link to a fake site that closely resembles the legitimate one and asks the victim to enter sensitive data.

### Common Signs of Phishing:
- **Suspicious Sender Address**: Mimics a trusted brand but has misspellings or odd domains.
- **Urgent Language**: Messages that pressure immediate action, like "Your account will be closed."
- **Unexpected Attachments or Links**: Never open unless verified.
- **Spelling and Grammar Mistakes**: Poorly written emails often indicate scams.
- **Requests for Personal Information**: Legit companies don’t ask for sensitive data via email.

### Types of Phishing:
- **Spear Phishing**: Targeted to specific individuals/orgs.
- **Smishing**: Phishing through SMS.
- **Vishing**: Phishing via voice calls.
- **Clone Phishing**: Copy of a real email with malicious content.

### How to Protect Yourself:
- Verify sender’s email address.
- Hover over links to see the destination.
- Never enter credentials through email links.
- Use multi-factor authentication.
- Report suspected phishing emails.

### If You Fall for a Phish:
- Change passwords immediately.
- Notify your IT/security team.
- Monitor account activity for fraud.
`,
    quiz: {
      questions: [
        {
          question: 'Which of the following is a common phishing tactic?',
          options: [
            'Sending personalized birthday wishes',
            'Using urgent language to prompt immediate action',
            'Delivering software updates via CD',
            'Inviting to a legitimate calendar event'
          ],
          correctIndex: 1
        },
        {
          question: 'What is a sign of a suspicious email address?',
          options: [
            'Correct spelling with official domain',
            'Randomized characters and misspelled company name',
            'Email ending in .com',
            'Email with user’s full name'
          ],
          correctIndex: 1
        },
        {
          question: 'How does spear phishing differ from regular phishing?',
          options: [
            'It uses brute-force tactics to guess passwords',
            'It targets a specific person or organization',
            'It is delivered only via phone call',
            'It comes from antivirus software'
          ],
          correctIndex: 1
        },
        {
          question: 'What should you do before clicking a link in an email?',
          options: [
            'Click immediately to verify',
            'Reply to the sender first',
            'Hover over the link to inspect the destination URL',
            'Open it in incognito mode'
          ],
          correctIndex: 2
        },
        {
          question: 'What is smishing?',
          options: [
            'Voice phishing over phone calls',
            'Phishing through SMS messages',
            'Physical mail-based scams',
            'Scanning malicious QR codes'
          ],
          correctIndex: 1
        },
        {
          question: 'Which of these is NOT a good anti-phishing practice?',
          options: [
            'Using multi-factor authentication (MFA)',
            'Checking email addresses carefully',
            'Entering credentials directly from email links',
            'Reporting suspicious messages to IT'
          ],
          correctIndex: 2
        },
        {
          question: 'What is clone phishing?',
          options: [
            'A repeated marketing email from Amazon',
            'A duplicated legitimate email with a malicious replacement link',
            'An attempt to hack a phone number',
            'A password reset link sent twice'
          ],
          correctIndex: 1
        },
        {
          question: 'What is one action to take if you suspect a phishing attempt?',
          options: [
            'Ignore it completely',
            'Reply with fake information',
            'Forward it to your coworkers',
            'Report it to IT and change your password if needed'
          ],
          correctIndex: 3
        },
        {
          question: 'Which of the following is true about legitimate companies?',
          options: [
            'They regularly ask for login credentials via email',
            'They usually send emails from public domains (like gmail.com)',
            'They won’t ask for sensitive info through email links',
            'They use text-to-speech messages to request bank details'
          ],
          correctIndex: 2
        },
        {
          question: 'What’s the purpose of urgent language in phishing?',
          options: [
            'To build trust slowly',
            'To confuse the recipient',
            'To create panic and prompt fast action without thinking',
            'To entertain with emojis and memes'
          ],
          correctIndex: 2
        }
      ]
    }
  }
];

export default sampleChallenges;
