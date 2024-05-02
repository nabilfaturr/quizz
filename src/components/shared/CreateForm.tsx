"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TCreateFormSchema, createFormSchema } from "@/lib/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import ResultComponent, { QuizData } from "./Result";
import { Toaster, toast } from "sonner";

const GRADES = ["SD", "SMP", "SMA", "Kuliah"];
const HARD_LEVEL = ["Mudah", "Menengah", "Susah"];

const CreateForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>("");

  const form = useForm<TCreateFormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      grade: "SD",
      hardLevel: "Mudah",
      subject: "",
      amount: 1,
    },
  });

  async function onSubmit(values: TCreateFormSchema) {
    try {
      setLoading(true);

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Something went wrong, try again");
        setLoading(false);
      }

      const data = await response.json();

      if (data.error) {
        toast.error("Something went wrong, try again");
        setLoading(false);
      }

      if (!data) {
        toast.error("Something went wrong, try again");
        setLoading(false);
      }

      const result: any = JSON.parse(data);

      toast.success("Quiz created successfully");
      setResult(result);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong, try again");
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <div className="rounded-lg p-5 border bg-slate-200">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Mata pelajaran apa?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh : Matematika" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              defaultValue="SD"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Buat kelas berapa?
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat kelas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GRADES.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="pl-1">
                    Default : SD
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hardLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Quiz-nya mau seberapa susah?
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat kesusahan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {HARD_LEVEL.map((hardLevel) => (
                        <SelectItem key={hardLevel} value={hardLevel}>
                          {hardLevel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="pl-1">
                    Default : Mudah
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Mau buat berapa soal?
                  </FormLabel>
                  <Input placeholder="1" {...field} type="number" max={5} />
                  <FormDescription className="pl-1">
                    Max Value : 5
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              onClick={() => form.handleSubmit(onSubmit)}
              className="bg-green-600 w-full hover:bg-green-700"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      </Form>
      <ResultComponent result={result} />
      <Toaster richColors />
    </>
  );
};

export default CreateForm;
