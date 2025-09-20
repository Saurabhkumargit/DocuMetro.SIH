import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Privacy Policy – DocuMetro
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy and data security are our top priorities
            </p>
          </div>

          <div className="space-y-8">
            {/* Data Collection Section */}
            <section className="bg-card rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Data Collection
              </h2>
              <p className="text-foreground leading-relaxed">
                We only collect documents, user credentials (Name, Email, Designation, Station), 
                and chatbot queries to improve the system. All data collection is strictly limited 
                to what is necessary for the proper functioning of the DocuMetro document management 
                system for Kochi Metro Rail Limited operations.
              </p>
            </section>

            {/* Data Usage Section */}
            <section className="bg-card rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Data Usage
              </h2>
              <p className="text-foreground leading-relaxed">
                Uploaded documents are used strictly for internal operations of Kochi Metro Rail 
                Limited (KMRL). The AI chatbot only references these documents and does not use 
                external data. All interactions are logged solely for system improvement and 
                operational efficiency within the KMRL ecosystem.
              </p>
            </section>

            {/* Data Sharing Section */}
            <section className="bg-card rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Data Sharing
              </h2>
              <p className="text-foreground leading-relaxed">
                No data is shared with third parties; it remains within the KMRL system. 
                All documents and user information are contained within our secure infrastructure 
                and are accessible only to authorized KMRL personnel with appropriate clearance levels.
              </p>
            </section>

            {/* Security Section */}
            <section className="bg-card rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Security
              </h2>
              <p className="text-foreground leading-relaxed">
                All data is stored securely with encryption and role-based access to prevent 
                unauthorized usage. We implement industry-standard security protocols including 
                end-to-end encryption, secure authentication mechanisms, and regular security 
                audits to protect sensitive government documents and user information.
              </p>
            </section>

            {/* Reason for Privacy Policy Section */}
            <section className="bg-card rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Reason for Privacy Policy
              </h2>
              <p className="text-foreground leading-relaxed">
                Since this project is built for Smart India Hackathon 2025 and directly handles 
                sensitive government documents, privacy is critical to ensure compliance, data 
                confidentiality, and trust in the solution. This policy ensures transparency in 
                our data handling practices and demonstrates our commitment to protecting sensitive 
                information in accordance with government standards and regulations.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Last updated: January 2025 | Smart India Hackathon 2025 Project
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;