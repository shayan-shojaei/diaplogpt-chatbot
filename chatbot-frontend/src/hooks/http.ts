import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useAxiosPost = (url: string) => {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [payload, setPayload] = useState<any>(null);

	useEffect(() => {
		(async () => {
			if (payload === null) return;
			try {
				setLoading(true);
				const response = await axios.post(url, JSON.stringify(payload), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				setData(response.data);
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payload]);

	const post = (data: any) => {
		setPayload({ sentences: data });
	};

	return { post, data, error, loading };
};
