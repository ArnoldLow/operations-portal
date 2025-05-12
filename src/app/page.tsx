import Layout from "@/components/Layout/index";

export default async function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 px-6 md:px-28 pb-9">
        {/* Meetings Section */}
        <section>
          <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
        </section>

        {/* Viewings Section */}
        <section>
          <h2 className="text-2xl text-gray-600 pt-9 lg:pt-0 mb-8">Viewings</h2>
        </section>
      </div>
    </Layout>
  );
}
