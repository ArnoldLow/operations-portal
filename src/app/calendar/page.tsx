import Layout from "@/components/Layout/index";

export default async function Calendar() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 px-6 md:px-28 pb-9">
        {/* Rooms Section */}
        <section>
          <h2 className="text-2xl text-gray-600 mb-8">Rooms</h2>
        </section>
      </div>
    </Layout>
  );
}
