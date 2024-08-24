import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDashboardStore } from "../../store";

const formSchema = z.object({
  title: z.string().min(1, "Invalid title").max(255, "Invalid title"),
  description: z.string().max(255, "Invalid description").optional(),
  selectedCategory: z.string().min(1, "Please select a category"),
});

export const AddWidgetModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      selectedCategory: "",
    },
  });

  const { dashboardData, addWidget } = useDashboardStore();
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.title && data.selectedCategory) {
      addWidget(data.selectedCategory, {
        type: "text",
        name: data.title,
        data: data.description || "",
      });
    }
    form.reset();
    form.clearErrors();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Widget</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter widget title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter widget description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <select {...field} className="w-full rounded border p-2">
                      <option value="">Select Category</option>
                      {dashboardData.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
