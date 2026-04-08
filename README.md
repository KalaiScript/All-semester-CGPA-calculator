# CGPA Calculator 📊

A modern, user-friendly web application for calculating Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA) for college students.

## ✨ Features

📱 Core Functionality
- **Semester-wise GPA Calculation**: Calculate SGPA for semesters 1-8
- **Multiple Subject Support**: Handle varying credit values (1-4 credits per subject)
- **Grade Input**: Support for all grade types (O, A+, A, B+, B, C, U)
- **Previous Stats Integration**: Use previous semester data for CGPA calculation
- **Calculation History**: Track and review all past calculations
- **PDF Report Generation**: Download professional grade reports with student details

### 🎨 Design Features
- **Dark Mode Interface**: Modern dark theme with glassmorphism effects
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Smooth Animations**: Polished user experience with transitions and hover effects
- **Color Scheme**: Professional blue theme (#2f80ed primary color)

### 🛠️ Advanced Features
- **Subject Management**: Admin dashboard for managing semester subjects
- **Smart History**: Automatically fetches latest calculations for Previous Stats
- **Regulation Support**: Identifies regulation year (2021/2023/2025) based on semester
- **Readonly Previous Stats**: Pre-filled data from calculation history
- **Local Storage**: All data stored locally in browser

## 📁 File Structure

```
full sem/
├── index.html          # Landing page with semester selection
├── calculator.html     # Main SGPA/CGPA calculator
├── history.html        # Calculation history viewer
├── admin.html         # Admin access page
├── dashboard.html     # Subject management dashboard
├── script.js          # Core application logic
└── style.css          # Styling and themes
```

## 🚀 Getting Started

### Installation

1. **Clone or Download** this repository
2. **Open** `index.html` in a web browser
3. **No dependencies required** - runs entirely in the browser!

### Usage

#### Calculating SGPA

1. Open `index.html` in your browser
2. Select your semester (1-8)
3. Enter grades for each subject
4. Click **Calculate Result**
5. View your SGPA and download the report

#### Using Previous Stats

1. On the calculator page, enable the **Previous Stats** toggle
2. The system automatically loads your latest calculation
3. Your CGPA will be calculated using current semester + previous data

#### Viewing History

1. Click **History** from the landing page
2. View all your past calculations
3. Clear history if needed

#### Managing Subjects (Admin)

1. Navigate to the admin dashboard
2. Add, edit, or delete subjects for any semester
3. Changes are saved automatically

## 💻 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: No frameworks required
- **html2pdf.js**: PDF generation library
- **LocalStorage API**: Data persistence

### Browser Compatibility
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Data Storage
All data is stored locally using browser LocalStorage:
- `gpa_history`: Calculation history
- `subjects_sem_X`: Subject data for each semester
- `custom_subjects`: User-added subjects (legacy)

## 🎓 Grade Point System

| Grade | Points |
|-------|--------|
| O     | 10     |
| A+    | 9      |
| A     | 8      |
| B+    | 7      |
| B     | 6      |
| C     | 5      |
| U     | 0      |

## 📊 Calculation Formula

**SGPA** = Total Grade Points / Total Credits

**CGPA** = (Previous Total Points + Current Total Points) / (Previous Total Credits + Current Total Credits)

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #2f80ed;  /* Main blue color */
    --bg-color: #0a0e17;       /* Background */
    --card-bg: #161b22;        /* Card background */
}
```

### Adding Subjects
Use the admin dashboard or edit `subjectData` in `script.js`:
```javascript
const subjectData = {
    1: [
        { name: "Subject Name", credit: 3, code: "CODE" }
    ]
};
```

## 📱 Features in Detail

### PDF Report Includes:
- Student name and roll number
- Calculation date
- Complete subject list with grades and credits
- Final SGPA/CGPA
- Percentage calculation
- Professional formatting

### Previous Stats Feature:
- Automatically fetches latest calculation from history
- Displays semester source
- Auto-calculates cumulative credits and GPA
- Readonly fields for data integrity

## 🐛 Known Limitations

- Semester 8 is locked to a single 12-credit "Project Work Phase III"
- History limited to 50 entries
- Data stored only in browser (not synced across devices)

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:
- Report issues
- Suggest features
- Improve documentation

## 📄 License

This project is free to use for educational purposes.

## 📞 Support

For questions or issues, please contact the developer.

---

**Made with ❤️ for college students**

*Last Updated: January 2026*
