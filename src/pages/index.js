import Button from "@/components/common/Button";
import Categorybrowse from "@/components/home/Categorybrowse";
import Herosection from "@/components/home/Herosection";
import Newarrival from "@/components/home/Newarrival";
import Topselling from "@/components/home/Topselling";
import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Herosection />
      <Newarrival />
      <Topselling />
      <Categorybrowse />
    </MainLayout>
  );
}
