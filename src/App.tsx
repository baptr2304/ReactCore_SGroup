import CustomRouter from "@/router/CustomRouter";

function App({
  routes,
}: {
  routes: { path: string; component: React.ReactElement }[];
}) {
  return (
    <div className="min-h-screen bg-background">
      <CustomRouter routes={routes} />
    </div>
  );
}

export default App;
