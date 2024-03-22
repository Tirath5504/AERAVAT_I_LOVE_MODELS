async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Unbabel/gec-t5_small",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "I is going to school."}).then((response) => {
	console.log(JSON.stringify(response[0].generated_text , null , 2));
});