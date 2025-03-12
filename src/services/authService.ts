import supabase from '../supabaseClient'; // Certifique-se de importar o cliente do Supabase

interface UserCredentials {
    fullName: string;
    accountType: 'Nutricionist' | 'Client'; // Definindo os tipos de conta possíveis
    email: string;
    password: string;
}

export async function registerUser({ fullName, accountType, email, password }: UserCredentials) {
    try {
        // Criar usuário na tabela de autenticação
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            throw new Error(error.message);
        }

        // Inserir dados adicionais no banco de dados (como nome completo e tipo de conta)
        const { data, error: insertError } = await supabase
            .from('users') // A tabela de usuários
            .insert([
                {
                    id: user?.id, // A chave primária do usuário criada pelo Supabase
                    name: fullName, // O nome completo
                    TypeAccount: accountType, // O tipo de conta (Nutricionist ou Client)
                    email,
                },
            ]);

        if (insertError) {
            throw new Error(insertError.message);
        }

        console.log('Usuário cadastrado com sucesso!');
        return data;
    } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error;
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const { user, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log('Usuário logado com sucesso!');
        return user;
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
}
