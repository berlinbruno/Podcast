"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResetIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";
import { categories } from "@/utils/data";
import PreviewPodcastCard from "../card/PreviewPodcastCard";
import { getCookie } from "@/utils/cookies";
import { toast } from "sonner";
import PopupMenu from "../menu/PopupMenu";

const EditPodcastForm = ({ podcast, podcastId, userId }) => {
  const [formData, setFormData] = useState({
    title: podcast.title,
    description: podcast.description,
    category: podcast.category,
    userName: "",
    image: null,
    imagePreview: podcast?.imageUrl,
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        [name]: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      const jwtToken = getCookie("accessToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwtToken);

      const formdata = new FormData();
      formdata.append("title", formData.title);
      formdata.append("description", formData.description);
      formdata.append("category", formData.category);
      formdata.append("imageFile", formData.image);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update/podcast/${podcastId}`,
        requestOptions
      );
      if (res.ok) {
        const result = await res.text();
        window.location.href = `/user/${userId}/${podcastId}`;
        toast(result);
        console.info(result);
      } else {
        const result = await res.text();
        setError(result);
        console.error(result);
      }
    } catch (error) {
      console.error("Error updating podcast:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    try {
      setDeleting(true);
      const jwtToken = getCookie("accessToken");

      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete/podcast/${podcastId}`,
        requestOptions
      );
      if (res.ok) {
        const result = await res.text();
        window.location.href = `/user/${userId}`;
        toast(result);
        console.info(result);
      } else {
        const result = await res.text();
        setError(result);
        console.error(result);
      }
    } catch (error) {
      console.error("Error deleting podcast:", error);
      setError(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <h1 className="title place-self-center">Edit Podcast</h1>
      <Label htmlFor="title">Title</Label>
      <Input
        name="title"
        type="text"
        value={formData.title}
        placeholder="Title"
        minLength="3"
        maxLength="20"
        onChange={handleInputChange}
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        type="text"
        name="description"
        placeholder="Description about your podcast"
        minLength="20"
        maxLength="250"
        value={formData.description}
        onChange={handleInputChange}
        className=" h-[200px] md:h-[100px]"
      />
      <Label htmlFor="image">Image</Label>
      <Input
        type="file"
        accept="image/jpeg, image/png, image/webp"
        name="image"
        onChange={handleInputChange}
      />
      <Label htmlFor="category">Category</Label>
      <Select
        id="category"
        name="category"
        onValueChange={(e) => {
          setFormData({
            ...formData,
            category: e,
          });
        }}
        defaultValue={formData.category}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categories.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <div className=" text-right text-sm text-destructive">{error}*</div>
      )}
      <Label>Preview</Label>
      <PreviewPodcastCard podcast={formData} />
      <div className="flex gap-2">
        <Button
          type="reset"
          variant="outline"
          size="icon"
          onClick={() => {
            setFormData({
              title: podcast.title,
              description: podcast.description,
              category: podcast.category,
              userName: "",
              image: null,
              imagePreview: podcast?.imageUrl,
            });
            setError(null);
          }}
        >
          <ResetIcon />
        </Button>
        <PopupMenu callfunction={handleDelete} status={deleting} />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default EditPodcastForm;
