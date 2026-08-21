import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Toaster } from 'sonner';
import { useFlashToast } from '@/hooks/use-flash-toast';
import type { Pacote } from '@/types/site';

interface ReservasProps {
    pacotes: Pacote[];
}

export default function Reservas({ pacotes }: ReservasProps) {
    useFlashToast();

    const form = useForm({
        nome: '',
        email: '',
        telefone: '',
        pacote_id: '',
        data_pretendida: '',
        numero_viajantes: '1',
        mensagem: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/reservas', { preserveScroll: true });
    }

    return (
        <>
            <Head title="Reservar" />
            <Toaster />
            <main className="mx-auto w-full max-w-xl px-6 py-12">
                <h1 className="text-3xl font-bold">Reservar</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Preencha o formulário e entraremos em contacto consigo.
                </p>

                <form onSubmit={submit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="nome" className="text-sm font-medium">
                            Nome
                        </label>
                        <input
                            id="nome"
                            value={form.data.nome}
                            onChange={(e) =>
                                form.setData('nome', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                        />
                        {form.errors.nome && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.nome}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                        />
                        {form.errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="telefone"
                            className="text-sm font-medium"
                        >
                            Telefone
                        </label>
                        <input
                            id="telefone"
                            value={form.data.telefone}
                            onChange={(e) =>
                                form.setData('telefone', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                        />
                        {form.errors.telefone && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.telefone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="pacote_id"
                            className="text-sm font-medium"
                        >
                            Pacote de interesse
                        </label>
                        <select
                            id="pacote_id"
                            value={form.data.pacote_id}
                            onChange={(e) =>
                                form.setData('pacote_id', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                        >
                            <option value="">— Selecionar —</option>
                            {pacotes.map((pacote) => (
                                <option key={pacote.id} value={pacote.id}>
                                    {pacote.titulo}
                                </option>
                            ))}
                        </select>
                        {form.errors.pacote_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.pacote_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="data_pretendida"
                            className="text-sm font-medium"
                        >
                            Data pretendida
                        </label>
                        <input
                            id="data_pretendida"
                            type="date"
                            value={form.data.data_pretendida}
                            onChange={(e) =>
                                form.setData('data_pretendida', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                        />
                        {form.errors.data_pretendida && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.data_pretendida}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="numero_viajantes"
                            className="text-sm font-medium"
                        >
                            Número de viajantes
                        </label>
                        <input
                            id="numero_viajantes"
                            type="number"
                            min="1"
                            value={form.data.numero_viajantes}
                            onChange={(e) =>
                                form.setData('numero_viajantes', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                        />
                        {form.errors.numero_viajantes && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.numero_viajantes}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="mensagem"
                            className="text-sm font-medium"
                        >
                            Mensagem
                        </label>
                        <textarea
                            id="mensagem"
                            rows={4}
                            value={form.data.mensagem}
                            onChange={(e) =>
                                form.setData('mensagem', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                        />
                        {form.errors.mensagem && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.mensagem}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="w-full rounded-md bg-sidebar-primary px-5 py-2.5 text-sm font-medium text-sidebar-primary-foreground disabled:opacity-50"
                    >
                        {form.processing ? 'A enviar…' : 'Enviar reserva'}
                    </button>
                </form>
            </main>
        </>
    );
}
