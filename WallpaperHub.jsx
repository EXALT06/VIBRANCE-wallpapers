
import React, { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { useTheme } from "./components/theme/ThemeProvider";
import { Card, CardContent } from "./components/ui/card";
import { Heart, Download, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dummyWallpapers = [
  { id: 1, url: "https://picsum.photos/600/400?random=1", title: "Nature" },
  { id: 2, url: "https://picsum.photos/600/400?random=2", title: "Abstract" },
  { id: 3, url: "https://picsum.photos/600/400?random=3", title: "City" },
];

export default function WallpaperHub() {
  const { darkMode, setDarkMode } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [uploaded, setUploaded] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploaded((prev) => [
          ...prev,
          {
            id: Date.now(),
            url: event.target.result,
            title: file.name.split(".")[0],
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const allWallpapers = [...uploaded, ...dummyWallpapers];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vibrance</h1>
        <div className="flex gap-2">
          <label className="cursor-pointer">
            <input type="file" hidden onChange={handleUpload} />
            <Button variant="ghost">
              <UploadCloud className="mr-1" /> Upload
            </Button>
          </label>
          <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </Button>
        </div>
      </header>

      <Input placeholder="Search wallpapers..." className="mb-4" />

      <Tabs value="all" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {allWallpapers.map((wallpaper) => (
          <Card key={wallpaper.id} onClick={() => setModalImage(wallpaper)} className="cursor-pointer">
            <CardContent>
              <img
                src={wallpaper.url}
                alt={wallpaper.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">{wallpaper.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(wallpaper.id);
                    }}
                  >
                    <Heart fill={favorites.includes(wallpaper.id) ? "red" : "none"} color="red" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      const link = document.createElement("a");
                      link.href = wallpaper.url;
                      link.download = wallpaper.title;
                      link.click();
                    }}
                  >
                    <Download />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.img
              src={modalImage.url}
              alt={modalImage.title}
              className="max-w-full max-h-full rounded shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
