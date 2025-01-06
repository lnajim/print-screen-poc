'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { usePrintScreen } from './hooks/use-print-screen'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Loader2 } from 'lucide-react'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
	url: z.string().url("Please enter a valid URL"),
})

type FormValues = z.infer<typeof formSchema>

export default function PrintScreenForm() {
	const { isLoading, progress, handleScreenshot } = usePrintScreen()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: "",
		},
	})

	const onSubmit = async (data: FormValues) => {
		await handleScreenshot(data.url)
		form.reset()
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Enter URL</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Enter URL"
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={isLoading}>
							{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							{isLoading ? 'Taking Screenshot...' : 'Submit'}
						</Button>

						{isLoading && (
							<div className="space-y-2">
								<Progress value={progress} className="w-full" />
								<p className="text-sm text-center text-muted-foreground">
									{Math.round(progress)}%
								</p>
							</div>
						)}
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
