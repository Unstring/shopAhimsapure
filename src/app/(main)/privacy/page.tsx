export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-headline prose-a:text-primary hover:prose-a:underline">
      <h1>Privacy Policy for AhimsaPure</h1>

      <p>
        <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <p>
        Welcome to AhimsaPure.com. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ahimsapure.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
      </p>

      <h2>1. Collection of Your Information</h2>
      <p>
        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
      </p>
      <ul>
        <li>
          <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
        </li>
        <li>
          <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
        </li>
        <li>
          <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, or exchange products from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.
        </li>
      </ul>

      <h2>2. Use of Your Information</h2>
      <p>
        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
      </p>
      <ul>
        <li>Create and manage your account.</li>
        <li>Process your orders and deliver the products to you.</li>
        <li>Email you regarding your account or order.</li>
        <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
        <li>Improve our website and product offerings.</li>
        <li>Notify you of updates to the Site.</li>
      </ul>

      <h2>3. Disclosure of Your Information</h2>
      <p>
        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
      </p>
      <ul>
        <li>
          <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        </li>
        <li>
          <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
        </li>
      </ul>

      <h2>4. Security of Your Information</h2>
      <p>
        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
      </p>

      <h2>5. Policy for Children</h2>
      <p>
        We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have questions or comments about this Privacy Policy, please contact us at:
      </p>
      <address>
        AhimsaPure<br />
        Near Bengaluru, Karnataka<br />
        <a href="mailto:privacy@ahimsapure.com">privacy@ahimsapure.com</a>
      </address>
    </div>
  );
}
