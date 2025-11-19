# ✅ Testing Checklist - Joki Bokek

## Pre-Launch Testing

### 🏠 Homepage (/)
- [ ] Page loads without errors
- [ ] All sections visible
- [ ] "Mulai Sekarang" button works
- [ ] Navigation links functional
- [ ] Responsive on mobile/tablet/desktop
- [ ] No layout shift
- [ ] Images load properly
- [ ] Footer displays correctly

### 📚 Step 1: Task Selection (/steps/task)
- [ ] Page loads correctly
- [ ] Two task options visible (Daily & Semester)
- [ ] Can select task type
- [ ] Selected task highlights in blue
- [ ] Info box displays
- [ ] "Lanjut" button disabled until selection
- [ ] "Lanjut" button enabled after selection
- [ ] "Lanjut" button navigates to Step 2
- [ ] Stepper shows Step 1/5
- [ ] Can view "Kembali" button (even if page 1)

### ⏰ Step 2: Duration (/steps/duration)
- [ ] Page loads (redirects if no task selected)
- [ ] All 7 duration options visible
- [ ] Prices display correctly
- [ ] Price updates based on task type
- [ ] Can select duration
- [ ] Selected duration highlights
- [ ] Total price displays correctly
- [ ] Price calculation formula correct:
  - [ ] Daily 1day: 50,000 × 3.5 = 175,000
  - [ ] Daily 7day: 50,000 × 1.0 = 50,000
  - [ ] Semester 1day: 150,000 × 3.5 = 525,000
  - [ ] Semester 7day: 150,000 × 1.0 = 150,000
- [ ] "Isi Data Pribadi" button disabled until selection
- [ ] "Isi Data Pribadi" button enabled after selection
- [ ] "Kembali" button goes back to Step 1
- [ ] Stepper shows Step 2/5
- [ ] Price format shows "Rp" prefix

### 👤 Step 3: Details (/steps/details)
- [ ] Page loads (redirects if no task/duration selected)
- [ ] All form fields visible
- [ ] Form can be filled
- [ ] Can go back to Step 2 without clearing data
- [ ] Can return to Step 3 and data persists
- [ ] Stepper shows Step 3/5

**Validation Tests**:
- [ ] Empty form shows 5 error messages
- [ ] Clearing error when typing in field
- [ ] Name validation:
  - [ ] Empty: Error message
  - [ ] Valid text: OK
- [ ] Phone validation:
  - [ ] Empty: Error message
  - [ ] 08xxxxxxxxx: OK
  - [ ] +62xxxxxxxxx: OK
  - [ ] Less than 10 digits: Error
  - [ ] More than 13 digits: Error
- [ ] Email validation:
  - [ ] Empty: Error message
  - [ ] Invalid format (no @): Error
  - [ ] Valid format: OK
- [ ] Address validation:
  - [ ] Empty: Error message
  - [ ] Long text: OK
- [ ] Description validation:
  - [ ] Empty: Error message
  - [ ] Detailed text: OK
- [ ] "Pilih Metode Bayar" button:
  - [ ] Disabled if any field empty
  - [ ] Enabled if all fields filled
  - [ ] Navigates to Step 4 when clicked

### 💳 Step 4: Payment (/steps/payment)
- [ ] Page loads (redirects if incomplete data)
- [ ] Price summary shows correct information
- [ ] All 3 payment methods visible
- [ ] Can select payment method
- [ ] Selected method highlights
- [ ] Can deselect and reselect
- [ ] "Lanjut ke Review" button:
  - [ ] Disabled until method selected
  - [ ] Enabled after selection
  - [ ] Navigates to Step 5
- [ ] "Kembali" button goes to Step 3
- [ ] Stepper shows Step 4/5
- [ ] Info box shows payment info

### ✓ Step 5: Review (/steps/review)
- [ ] Page loads (redirects if incomplete)
- [ ] All order data displays correctly
  - [ ] Task type name
  - [ ] Duration
  - [ ] Full name
  - [ ] Phone number
  - [ ] Email
  - [ ] Address
  - [ ] Task description
  - [ ] Payment method
- [ ] Total price shows correctly
- [ ] Price matches calculation
- [ ] "Edit Data" button goes to Step 4
- [ ] "Konfirmasi & Bayar" button:
  - [ ] Works without errors
  - [ ] Shows success alert
  - [ ] Shows correct details in alert
  - [ ] Resets order after confirmation
  - [ ] Redirects to Step 1
- [ ] Stepper shows Step 5/5
- [ ] All text is readable

### 📱 Responsive Design Tests

**Mobile (320px - 480px)**:
- [ ] All text readable
- [ ] Buttons clickable
- [ ] No horizontal scroll
- [ ] Form fields full width
- [ ] Prices display correctly
- [ ] Images responsive

**Tablet (768px - 1024px)**:
- [ ] 2-column layout where applicable
- [ ] Grid layouts display properly
- [ ] All elements visible
- [ ] No overlapping text

**Desktop (1024px+)**:
- [ ] 3-4 column layouts display
- [ ] Wide layouts look good
- [ ] Spacing adequate
- [ ] No text overflow

### 🎨 Visual Tests

- [ ] Colors are consistent
- [ ] Gradient backgrounds display
- [ ] Shadows/borders render properly
- [ ] Emoji icons display correctly
- [ ] Typography hierarchy correct
- [ ] No text cutoff
- [ ] Hover effects work
- [ ] Focus states visible (keyboard nav)
- [ ] Button sizes appropriate

### 🔒 Data Flow Tests

- [ ] Data persists through all steps
- [ ] Can go back and forth without losing data
- [ ] Reset clears all data
- [ ] Multiple submissions possible
- [ ] No data leaking between users

### ⚡ Performance Tests

- [ ] Pages load in < 1 second
- [ ] No console errors
- [ ] No console warnings (except expected ones)
- [ ] Smooth animations/transitions
- [ ] No lag when typing in forms
- [ ] Images load quickly

### 🌐 Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### 🔗 Navigation Tests

- [ ] All buttons navigate correctly
- [ ] No broken links
- [ ] Back button works correctly
- [ ] Browser back button works
- [ ] Deep links redirect to correct step
- [ ] Invalid routes redirect appropriately

### 💬 Error Message Tests

- [ ] Error messages clear on input change
- [ ] Error messages are descriptive
- [ ] Error messages appear immediately
- [ ] Multiple errors show together
- [ ] Error styling is distinct

### 🔄 Edge Cases

- [ ] Can spam-click buttons
- [ ] Can rapidly change selections
- [ ] Can fill form multiple times
- [ ] Can navigate with keyboard
- [ ] Can use tab navigation
- [ ] Can paste in form fields
- [ ] Very long text doesn't break layout
- [ ] Special characters in fields work

---

## ✅ Completion Checklist

**Browser Tests**: 
- [ ] Chrome: PASS
- [ ] Firefox: PASS
- [ ] Safari: PASS
- [ ] Edge: PASS

**Device Tests**:
- [ ] Mobile (iPhone): PASS
- [ ] Mobile (Android): PASS
- [ ] Tablet: PASS
- [ ] Desktop: PASS

**Feature Tests**:
- [ ] All 5 steps working: PASS
- [ ] Task selection: PASS
- [ ] Duration & pricing: PASS
- [ ] Form validation: PASS
- [ ] Payment selection: PASS
- [ ] Review & confirm: PASS

**Data Tests**:
- [ ] Data persistence: PASS
- [ ] Form validation: PASS
- [ ] Price calculation: PASS
- [ ] State management: PASS

**Performance Tests**:
- [ ] Load time < 1s: PASS
- [ ] No console errors: PASS
- [ ] Responsive design: PASS
- [ ] Smooth interactions: PASS

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

Overall Status: [ ] PASS [ ] FAIL [ ] PARTIAL

Issues Found:
1. ___________
2. ___________
3. ___________

Notes:
___________
___________
```

---

## 🚀 Pre-Launch Checklist

- [ ] All tests passed
- [ ] No critical bugs
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Responsive on all devices
- [ ] Documentation complete
- [ ] Code reviewed
- [ ] Performance acceptable
- [ ] Security measures in place

---

**Ready for Launch When All Tests PASS ✅**
