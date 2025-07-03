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
  },
  {
    id: 2,
    title: 'Networking Basics',
    description: 'Understand OSI & TCP/IP models, IP addressing, and ports.',
    xp: 100,
    topic: 'Networking',
    tutorial: `
## 🌐 Networking Basics

Computer networking is the practice of connecting computers and devices to share data, resources, and communication services. It forms the foundation of the internet and organizational intranets.

---

### 📘 OSI Model (Open Systems Interconnection)
The OSI model standardizes communication into **7 layers**:

1. **Application Layer (Layer 7)**
   - Closest to the user
   - Interfaces with applications
   - Protocols: HTTP, SMTP, FTP

2. **Presentation Layer (Layer 6)**
   - Data translation, encryption, compression
   - Examples: TLS/SSL, JPEG, MPEG

3. **Session Layer (Layer 5)**
   - Establishes, manages and terminates connections
   - Example: NetBIOS, RPC

4. **Transport Layer (Layer 4)**
   - End-to-end communication
   - Ensures reliable delivery (TCP) or fast, unreliable (UDP)

5. **Network Layer (Layer 3)**
   - Routing and logical addressing (IP addresses)
   - Protocols: IP, ICMP

6. **Data Link Layer (Layer 2)**
   - MAC addresses, switches, error detection
   - Protocols: Ethernet, PPP

7. **Physical Layer (Layer 1)**
   - Actual hardware transmission (cables, NICs)

---

### 📗 TCP/IP Model
Used practically in the real world; has **4 layers**:

1. **Application Layer**
   - Includes OSI's Application, Presentation, and Session layers
   - Protocols: HTTP, FTP, DNS, SMTP

2. **Transport Layer**
   - Same as OSI
   - TCP (reliable), UDP (fast)

3. **Internet Layer**
   - Handles IP addressing and routing
   - Protocols: IP, ICMP, ARP

4. **Network Access Layer**
   - Includes OSI's Data Link and Physical layers
   - Deals with MAC, switches, physical media

---

### 🔍 Why These Models Matter
- **Troubleshooting**: Helps isolate network issues (e.g., Layer 3 = routing issue)
- **Design**: Guides protocol development and network architecture
- **Education**: Builds foundational understanding for advanced topics

---

### ✅ Key Concepts
- **IP Address**: Unique ID for devices (e.g., 192.168.1.1)
- **MAC Address**: Physical hardware address (e.g., 00:1A:2B:3C:4D:5E)
- **Subnetting**: Dividing networks for efficiency/security
- **Ports**: Identify services (e.g., port 80 = HTTP)
- **DNS**: Resolves domain names to IP addresses
- **Firewall**: Filters traffic for security
- **Router vs. Switch**: Router connects networks; switch connects devices within a network

---

Understanding the OSI and TCP/IP models helps you grasp how digital communication occurs and where things might go wrong.
`,
    quiz: {
      questions: [
        {
          question: 'Which OSI layer handles IP addressing?',
          options: ['Transport', 'Network', 'Session', 'Application'],
          correctIndex: 1,
        },
        {
          question: 'What is the role of the Transport layer?',
          options: ['Data encryption', 'Session management', 'Reliable delivery', 'Routing'],
          correctIndex: 2,
        },
        {
          question: 'TCP belongs to which OSI layer?',
          options: ['Data Link', 'Network', 'Transport', 'Session'],
          correctIndex: 2,
        },
        {
          question: 'Which protocol resolves domain names to IP addresses?',
          options: ['DHCP', 'DNS', 'IP', 'FTP'],
          correctIndex: 1,
        },
        {
          question: 'Which device forwards packets based on IP?',
          options: ['Switch', 'Hub', 'Router', 'Firewall'],
          correctIndex: 2,
        },
        {
          question: 'Which layer is responsible for encryption in OSI?',
          options: ['Presentation', 'Application', 'Session', 'Network'],
          correctIndex: 0,
        },
        {
          question: 'Port 443 is used by which protocol?',
          options: ['HTTP', 'SSH', 'HTTPS', 'FTP'],
          correctIndex: 2,
        },
        {
          question: 'Which OSI layer manages sessions?',
          options: ['Session', 'Presentation', 'Transport', 'Application'],
          correctIndex: 0,
        },
        {
          question: 'What does MAC stand for?',
          options: ['Media Access Control', 'Machine Address Code', 'Memory Access Channel', 'Modular Access Control'],
          correctIndex: 0,
        },
        {
          question: 'What is the main role of a switch?',
          options: ['Connect networks', 'Assign IPs', 'Block ports', 'Connect devices in LAN'],
          correctIndex: 3,
        },
        {
          question: 'Which layer ensures data packets reach the correct application?',
          options: ['Transport', 'Application', 'Session', 'Network'],
          correctIndex: 0,
        },
        {
          question: 'Which OSI layer is closest to the user?',
          options: ['Transport', 'Application', 'Session', 'Data Link'],
          correctIndex: 1,
        },
        {
          question: 'DNS works at which OSI layer?',
          options: ['Application', 'Network', 'Data Link', 'Physical'],
          correctIndex: 0,
        },
        {
          question: 'Which protocol is used to assign IP addresses dynamically?',
          options: ['DNS', 'DHCP', 'FTP', 'SMTP'],
          correctIndex: 1,
        },
        {
          question: 'What’s the function of ICMP?',
          options: ['Name resolution', 'Routing', 'Error reporting', 'Port scanning'],
          correctIndex: 2,
        },
        {
          question: 'Which of the following operates at Layer 2?',
          options: ['Router', 'Switch', 'DNS', 'TCP'],
          correctIndex: 1,
        },
        {
          question: 'Which device operates at multiple OSI layers?',
          options: ['Switch', 'Router', 'Bridge', 'Hub'],
          correctIndex: 1,
        },
        {
          question: 'What is the standard port for SSH?',
          options: ['21', '22', '23', '25'],
          correctIndex: 1,
        },
        {
          question: 'Which protocol ensures message delivery order?',
          options: ['UDP', 'IP', 'TCP', 'ARP'],
          correctIndex: 2,
        },
        {
          question: 'Which layer breaks data into segments?',
          options: ['Transport', 'Data Link', 'Network', 'Physical'],
          correctIndex: 0,
        },
        {
          question: 'What is the default port number for HTTP?',
          options: ['443', '22', '80', '21'],
          correctIndex: 2,
        },
        {
          question: 'What OSI layer would an Ethernet cable fall under?',
          options: ['Data Link', 'Physical', 'Transport', 'Application'],
          correctIndex: 1,
        },
        {
          question: 'Which protocol is used for secure web browsing?',
          options: ['FTP', 'HTTP', 'HTTPS', 'Telnet'],
          correctIndex: 2,
        },
        {
          question: 'A switch forwards traffic based on which address?',
          options: ['IP address', 'MAC address', 'Port number', 'Hostname'],
          correctIndex: 1,
        },
        {
          question: 'Which OSI layer provides end-to-end communication?',
          options: ['Network', 'Transport', 'Session', 'Application'],
          correctIndex: 1,
        },
        {
          question: 'Which tool helps identify device IPs on a network?',
          options: ['Traceroute', 'Nmap', 'Wireshark', 'Ping'],
          correctIndex: 1,
        },
        {
          question: 'What is the purpose of subnetting?',
          options: ['Speed up browsers', 'Create smaller broadcast domains', 'Hide MAC addresses', 'Encrypt data'],
          correctIndex: 1,
        },
        {
          question: 'Which protocol sends error messages back to sender?',
          options: ['HTTP', 'ICMP', 'DNS', 'FTP'],
          correctIndex: 1,
        },
        {
          question: 'What does a firewall primarily monitor?',
          options: ['Battery', 'IP addresses', 'Network traffic', 'Ports only'],
          correctIndex: 2,
        },
        {
          question: 'Which layer handles media and signal transmission?',
          options: ['Network', 'Transport', 'Physical', 'Application'],
          correctIndex: 2,
        }
      ]
    }
  }
];

export default sampleChallenges;
