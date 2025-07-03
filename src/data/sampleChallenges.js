// src/data/sampleChallenges.js
const sampleChallenges = [
  {
    id: 1,
    title: 'Spot the Phish',
    description: 'Master phishing detection techniques with real-world email analysis.',
    xp: 100,
    topic: 'Phishing',
    tutorial: `
# 🛡️ What is Phishing?
Phishing is a cyberattack where attackers impersonate trustworthy organizations via email, SMS, or phone to steal sensitive information like passwords, credit card numbers, or personal identities.

---

## 🔍 Why Is Phishing Effective?
Phishing attacks often use **psychological manipulation**:
- Fear: "Your account will be suspended!"
- Urgency: "Click now to avoid penalty"
- Curiosity: "Your package is delayed"
- Authority: "This is your bank speaking"

---

## 📂 Common Phishing Methods

### 1. **Email Phishing**
Bulk emails that appear to come from legitimate sources asking users to click malicious links or download infected attachments.

### 2. **Spear Phishing**
Targeted emails sent to specific individuals, often using personal information to appear credible.

### 3. **Whaling**
Aimed at high-ranking executives. Messages often mimic legal requests or financial actions.

### 4. **Smishing & Vishing**
- Smishing: SMS phishing
- Vishing: Voice phishing (e.g., fake tech support)

---

## 🧪 Real-World Case
**Twitter Breach (2020)**:
Hackers used phone spear phishing to trick employees into sharing internal tools. Result: Verified accounts were used to promote cryptocurrency scams.

---

## 🔍 How to Detect Phishing
- ✅ Check email domain (e.g., "support@micros0ft.com")
- ✅ Hover over links before clicking
- ✅ Avoid emails with urgent requests
- ✅ Watch for poor grammar or generic greetings
- ✅ Confirm with sender via official channels

---

## 🛡️ Prevention Strategies
- 🧠 User education & phishing simulations
- 🔐 Enable Multi-Factor Authentication (MFA)
- 🧰 Use email filtering tools (e.g., Microsoft Defender, Proofpoint)
- 🗂 Report phishing attempts to IT/security team
- 🧪 Use VirusTotal to scan links/files

---

## 🧰 Tools You Can Use
- **VirusTotal** – Scan URLs & files
- **Canarytokens.org** – Set traps for attackers
- **PhishTank** – Check URLs against a known database
- **MxToolbox** – Analyze email headers
- **Have I Been Pwned** – Check for exposed credentials

---

## 🏁 Summary
Phishing is more about **manipulating human behavior** than technical flaws. Learn to read between the lines, verify every suspicious communication, and educate others.
`,
    quiz: {
      questions: [
        {
          question: 'Which of the following is a common phishing tactic?',
          options: ['Polite greetings', 'Urgent and threatening language', 'Encrypted attachments', 'Multiple email signatures'],
          correctIndex: 1
        },
        {
          question: 'What is spear phishing?',
          options: ['Mass email spam', 'Targeted phishing using personal info', 'Phone-based scam', 'Phishing with a VPN'],
          correctIndex: 1
        },
        {
          question: 'What is smishing?',
          options: ['Phishing through SMS', 'Phishing through voice calls', 'Phishing through malware', 'A type of ransomware'],
          correctIndex: 0
        },
        {
          question: 'What is clone phishing?',
          options: ['Copying a legitimate email with malicious changes', 'Cloning a user’s browser', 'Phishing with a forged VPN tunnel', 'Duplicating log files'],
          correctIndex: 0
        },
        {
          question: 'Which one is a trusted method to verify a suspicious link?',
          options: ['Click and log out', 'Check spelling of sender', 'Hover to preview the real URL', 'Use a VPN first'],
          correctIndex: 2
        },
        {
          question: 'Which tool is best for analyzing links before clicking?',
          options: ['Excel', 'VirusTotal', 'Telegram', 'Photoshop'],
          correctIndex: 1
        },
        {
          question: 'A phishing email usually includes...',
          options: ['Grammar checks', 'Company logo only', 'Urgency and misspellings', 'Digital certificates'],
          correctIndex: 2
        },
        {
          question: 'What is vishing?',
          options: ['Phishing via SMS', 'Phishing through voice call', 'Phishing using virtual tokens', 'Browser hijacking'],
          correctIndex: 1
        },
        {
          question: 'Which group is often targeted by whaling?',
          options: ['Interns', 'System admins', 'Executives/CEOs', 'HR trainees'],
          correctIndex: 2
        },
        {
          question: 'A suspicious email claims “Your tax refund is ready.” What is it likely doing?',
          options: ['Sending info about tax policies', 'Tricking you into clicking malicious links', 'Encrypting your browser', 'Verifying your SSN'],
          correctIndex: 1
        },
        {
          question: 'A user receives an email asking to reset their bank password via an unknown link. What should they do?',
          options: ['Click immediately to prevent issues', 'Forward to friends for help', 'Visit bank site directly and verify', 'Ignore forever'],
          correctIndex: 2
        },
        {
          question: 'What does “https” indicate in a URL?',
          options: ['It is a phishing site', 'It’s verified by Google', 'Secure connection, not always safe content', 'It’s a government site'],
          correctIndex: 2
        },
        {
          question: 'Phishing attempts often have:',
          options: ['Generic greetings like "Dear Customer"', 'Your real name only', 'DMARC certification', 'Company ID numbers'],
          correctIndex: 0
        },
        {
          question: 'What’s the primary goal of phishing?',
          options: ['Entertainment', 'Customer service', 'Data theft', 'Ad targeting'],
          correctIndex: 2
        },
        {
          question: 'Which tool can help trace email source IPs?',
          options: ['Word', 'Excel', 'MxToolbox', 'Paint'],
          correctIndex: 2
        },
        {
          question: 'An email says your package failed to deliver. What should you verify?',
          options: ['Sender email domain', 'Link format', 'Company name spelling', 'All of the above'],
          correctIndex: 3
        },
        {
          question: 'What is the best first action when you suspect a phishing email?',
          options: ['Click to verify', 'Ignore', 'Report it internally', 'Unsubscribe'],
          correctIndex: 2
        },
        {
          question: 'A link appears like “login.bank.com” but points to “b4nk-login.ru”. This is an example of:',
          options: ['Valid redirect', 'Link spoofing', 'Cloud migration', 'Social login'],
          correctIndex: 1
        },
        {
          question: 'What’s the danger of attachments in phishing emails?',
          options: ['They look boring', 'They can contain malware', 'They slow down the browser', 'They link to ads'],
          correctIndex: 1
        },
        {
          question: 'Why is phishing considered a social engineering attack?',
          options: ['It involves building websites', 'It uses automation tools', 'It manipulates human psychology', 'It’s fully software-based'],
          correctIndex: 2
        }
      ]
    }
  }
];

export default sampleChallenges;
