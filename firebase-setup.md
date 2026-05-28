# Firebase Project Setup & Configuration

This guide provides step-by-step instructions to configure and deploy the Firebase backend services for **Smooth Operator**.

---

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it `smooth-operator` (or select your existing project e.g. `smooth-operator-fda60`).
3. (Optional) Choose whether to enable Google Analytics.
4. Click **Create Project**.

---

## 2. Enable Authentication Providers

1. In the left-hand sidebar, navigate to **Build > Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, enable the following providers:
   * **Email/Password**: Toggle "Enable" and click Save.
   * **Google**: Toggle "Enable", select your support email, and click Save.
   * **Anonymous**: Toggle "Enable" and click Save.
4. Under **Authorized domains**, add your Vercel deployment domains (e.g. `smooth-operator.vercel.app`) so Google Popup sign-in works in production.

---

## 3. Configure Cloud Firestore Database

1. Navigate to **Build > Firestore Database**.
2. Click **Create database**.
3. Select your Database Location (preferably close to your target audience e.g. `asia-south1` for India).
4. Start in **Production mode** (which denies all access by default).
5. Deploy the provided `firestore.rules` security policies using the Firebase CLI:
   ```bash
   firebase deploy --only firestore:rules
   ```
   *Or copy the contents of `firestore.rules` and paste them directly into the **Rules** tab in the console.*

---

## 4. Configure Cloud Storage

1. Navigate to **Build > Storage**.
2. Click **Get Started**.
3. Start in **Production mode** (which enforces default rules).
4. Click Done to initialize the bucket.
5. In the **Rules** tab, deploy permissions that allow authenticated users to write to `reviews/{uid}/` and reviewers to write to `voicenotes/`.
   Example rules:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /reviews/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /voicenotes/{reviewerId}/{allPaths=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == reviewerId;
       }
     }
   }
   ```

---

## 5. Set Admin and Reviewer Roles

To elevate a user's permissions, set their role inside the Firestore database:

### Option A: The Users Collection (Fallback)
1. Find the user's document under the `/users` collection (the document ID matches their Firebase Auth UID).
2. Change the `role` field from `"user"` to `"admin"`, `"reviewer"`, or `"coach"`.

### Option B: The Admins Collection (Preferred for Security Rules)
1. Create a collection named `admins`.
2. Create a document where the Document ID is the user's Auth UID.
3. Add a field: `isAdmin` (Boolean) set to `true`.

---

## 6. Gather Environment Variables

Register a Web App inside your Firebase Project to retrieve configuration tokens:
1. Navigate to **Project Settings** (gear icon) > **General**.
2. Under **Your apps**, click the `</>` (Web) icon to add an app.
3. Register the app as `Smooth Operator Web`.
4. Copy the `firebaseConfig` object and add the values to your `.env.local` or Vercel dashboard:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=smooth-operator-fda60.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=smooth-operator-fda60
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=smooth-operator-fda60.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=1:......
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-......

# Server-Side Gemini API Key (do NOT prefix with NEXT_PUBLIC_)
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.0-flash
```
