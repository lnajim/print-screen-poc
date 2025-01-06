'use client'

import { usePrintScreenStore } from "./store/use-print-screen-store";
import Image from "next/image";

export function PrintScreenResult() {
	const { screenshot } = usePrintScreenStore();

	if (!screenshot) return null;

	return (
		<div className="mt-4 w-full max-w-md">
			<Image
				src={`data:image/png;base64,${screenshot}`}
				alt="Screenshot Result"
				className="w-full rounded-lg shadow-lg"
			/>
		</div>
	);
}

export default PrintScreenResult;